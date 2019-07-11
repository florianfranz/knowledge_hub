"""Views for deposit of records."""

from __future__ import absolute_import, print_function

from flask import Blueprint, redirect, render_template, url_for
from flask_login import login_required
from flask_security import current_user

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
            docset_doi=form.docset_doi.data,
            docset_title=form.docset_title.data,
            docset_abstract=form.docset_abstract.data,
            docset_keywords=form.docset_keywords.data,
            docset_notes=form.docset_notes.data,
            publications=form.publications.data,
            datasets=form.datasets.data,
            tools=form.tools.data,
            outputs=form.outputs.data,
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
