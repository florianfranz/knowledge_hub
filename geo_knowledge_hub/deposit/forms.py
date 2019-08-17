"""Simple deposit form module."""

from __future__ import absolute_import, print_function

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList, FormField, Form, validators, HiddenField


class DocsetForm(Form):
    """Form for document set"""

    docset_doi = StringField(
        'DOI of the Document Set'
    )
    docset_title = StringField(
        'Title of Document Set'
    )
    docset_abstract = StringField(
        'Abstract of the Document Set'
    )
    docset_keywords = FieldList(StringField(
        'Keywords for the Document Set'
    ), min_entries=2, max_entries=None)
    docset_notes = StringField(
        'Additional notes or comments on the Document Set'
    )

class PublicationForm(Form):
    """Form for publication"""

    publication_type = StringField(
        'Type of Publication'
    )
    publication_doi = StringField(
        'DOI of the Publication'
    )
    publication_title = StringField(
        'Title of the Publication'
    )
    publication_date = StringField(
        'Date of the Publication'
    )
    publication_authors = FieldList(StringField(
        'Authors of the Publication'
    ), min_entries=3, max_entries=None)
    publication_abstract = StringField(
        'Abstract of the Publication'
    )

class DatasetForm(Form):
    """Form for dataset"""

    dataset_doi = StringField(
        'DOI of the Dataset'
    )
    dataset_creator = StringField(
        'Creator of the Dataset'
    )
    dataset_type = StringField(
        'Type of the Dataset'
    )
    dataset_date = StringField(
        'Date of Dataset'
    )
    dataset_title = StringField(
        'Title of the Dataset'
    )
    dataset_abstract = StringField(
        'Abstract of the Dataset'
    )
    dataset_link = StringField(
        'Link to the Dataset'
    )

class ToolForm(Form):
    """Form for tools"""

    tool_doi = StringField(
        'DOI of the Tool'
    )
    tool_type = StringField(
        'Type of the Tool'
    )
    tool_title = StringField(
        'Title of the Tool'
    )
    tool_abstract = StringField(
        'Abstract of the Tool'
    )
    tool_link = StringField(
        'Link to the Tool'
    )

class OutputForm(Form):
    """Form for output & products"""
    output_doi = StringField(
        'DOI of the Output/product'
    )
    output_type = StringField(
        'Type of the Output/product'
    )
    output_title = StringField(
        'Title of the Output/product'
    )
    output_abstract = StringField(
        'Abstract of the Output/product'
    )
    output_link = StringField(
        'Link to the Output/product'
    )

class VirtenvForm(Form):
    virtenv_doi = StringField(
        'DOI of the virtual environment'
    )

class RecordForm(FlaskForm):
    """A simple deposit form."""

    title = StringField(
        'Title', [validators.DataRequired()]
    )
    resource_type = StringField(
        'Type of resource', [validators.DataRequired()]
    )
    # Store bucket identifier containing the uploaded files
    bucket = HiddenField('Bucket', )

    docset = FormField(DocsetForm)
    publications = FieldList(FormField(PublicationForm), min_entries=3, max_entries= None)
    datasets = FieldList(FormField(DatasetForm), min_entries=2, max_entries = None)
    tools = FieldList(FormField(ToolForm), min_entries=1, max_entries=None)
    outputs = FieldList(FormField(OutputForm), min_entries=1, max_entries=None)
    virtenvs = FieldList(FormField(VirtenvForm), min_entries=1, max_entries=None)
