"""Simple deposit form module."""

from __future__ import absolute_import, print_function

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FieldList, FormField, Form, validators


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
    ))
    publication_abstract = StringField(
        'Abstract of the Publication'
    )

class DatasetForm(Form):
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

class RecordForm(FlaskForm):
    """A simple deposit form."""

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
    ))
    docset_notes = StringField(
        'Additional notes or comments on the Document Set'
    )
    publications = FieldList(FormField(PublicationForm))
    datasets = FieldList(FormField(DatasetForm))
    tools = FieldList(FormField(ToolForm))
    outputs = FieldList(FormField(OutputForm))
