"""Views for deposit of records."""

from __future__ import absolute_import, print_function

from flask import Blueprint, redirect, render_template, url_for, jsonify, request
from flask_login import login_required
from flask_security import current_user

from invenio_db import db
from invenio_files_rest.models import Bucket, Location, ObjectVersion

from geo_knowledge_hub.config import GEO_KNOWLEDGE_HUB_DEFAULT_BUCKET_URL

from .forms import RecordForm, PublicationForm
from .api import create_record


# define a new Flask Blueprint that is register under the url path /deposit
blueprint = Blueprint(
    'deposit',
    __name__,
    url_prefix='/deposit',
    template_folder='templates',
    static_folder='static',
)


@blueprint.route('/create', methods=('GET', 'POST'))
@login_required
def create():
    """The create view."""
    form = RecordForm()
    # if the form is submitted and valid
    if form.validate_on_submit():
        # set the owner as the current logged in user
        owner = int(current_user.get_id())
        # create the record
        create_record(
          dict(
            title=form.title.data,
            resource_type=form.resource_type.data,
            docset=form.docset.data,
            publications=form.publications.data,
            datasets=form.datasets.data,
            tools=form.tools.data,
            outputs=form.outputs.data,
            virtenvs=form.virtenvs.data,
            bucket=form.bucket.data
          )
        )
        # redirect to the success page
        return redirect(url_for('deposit.success'))
    return render_template('deposit/create.html', form=form)


@blueprint.route("/success")
@login_required
def success():
    """The success view."""
    return render_template('deposit/success.html')


def upload_file(bucket, stream, filename):
    """
    Helper to upload files to the database storage

    Args:
        bucket (str): Bucket Identifier
        stream (io.BytesIO): Binary stream with file data
        filename (str): File name
    """
    with db.session.begin_nested():
        bucket = db.session.query(Bucket).filter(Bucket.id == bucket).first()

        assert bucket is not None

        ObjectVersion.create(bucket, filename, stream=stream)
    db.session.commit()


@blueprint.route('/create-bucket',
                 defaults={'bucket_id': None}, methods=['POST'])
@blueprint.route('/create-bucket/<bucket_id>', methods=['POST'])
def create_bucket(bucket_id=None):
    with db.session.begin_nested():
        loc = Location.get_default()

        if not loc:
            loc = Location(name='local', uri=GEO_KNOWLEDGE_HUB_DEFAULT_BUCKET_URL, default=True)
            db.session.add(loc)

        bucket = db.session.query(Bucket).filter(Bucket.id == bucket_id).first()

        if not bucket:
            bucket = Bucket.create(
                quota_size=100 * 1000 * 1000,
                max_file_size=100 * 1000 * 1000,
                locked=False
            )

    db.session.commit()

    return jsonify({"bucket_id": bucket.id})


@blueprint.route('/buckets/<bucket_id>', methods=['PUT', 'POST'])
def create_file_in_bucket(bucket_id):
    """
    Route to upload file or files to provided bucket

    Args:
        bucket_id (str): Bucket Identifier

    Returns:
        flask.Response with content serialization as JSON
    """
    files_key = next(request.files.keys())

    for file_storage in request.files.getlist(files_key):
        upload_file(bucket_id, request.stream, file_storage.filename)

    return jsonify({})


@blueprint.route('/files/<bucket_id>', methods=['DELETE'])
def delete_file(bucket_id):
    key = ''
    deleted_file = ObjectVersion.delete(bucket_id, key)

    if deleted_file:
        return jsonify({"status": "ok"})

    return jsonify({"error": "not found"}), 404


@blueprint.route('/files/<bucket_id>/<key>', methods=['GET'])
def get_bucket_files(bucket_id, key):
    """
    Route to download file from bucket

    Args:
        bucket_id (str): Bucket Identifier
        key (str): File Identifier

    Returns:
        Object Serialization to download
    """

    obj = ObjectVersion.get(bucket_id, key, version_id=1)

    return obj.send_file(restricted=True,
                         as_attachment=False)
