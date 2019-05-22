"""Simple deposit form module."""

from __future__ import absolute_import, print_function

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, validators


class RecordForm(FlaskForm):
    """A simple deposit form."""

    title = StringField(
        'Title', [validators.DataRequired()]
    )
    publication_date = StringField(
        'Date of Publication', [validators.DataRequired()]
    )
    resource_type = StringField(
        'Type of Resource', [validators.DataRequired()]
    )
    recid = IntegerField(
        'Record ID', [validators.DataRequired()]
    )
