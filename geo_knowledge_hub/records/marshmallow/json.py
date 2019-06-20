# -*- coding: utf-8 -*-
#
# Copyright (C) 2019 GEO.
#
# GEO Knowledge Hub is free software; you can redistribute it and/or modify
# it under the terms of the MIT License; see LICENSE file for more details.

"""JSON Schemas."""

from __future__ import absolute_import, print_function

from invenio_records_rest.schemas import Nested, StrictKeysMixin
from invenio_records_rest.schemas.fields import DateString, \
    PersistentIdentifier, SanitizedUnicode
from marshmallow import fields, missing, validate


class PersonIdsSchemaV1(StrictKeysMixin):
    """Ids schema."""

    source = SanitizedUnicode()
    value = SanitizedUnicode()


class ContributorSchemaV1(StrictKeysMixin):
    """Contributor schema."""

    ids = fields.Nested(PersonIdsSchemaV1, many=True)
    name = SanitizedUnicode(required=True)
    role = SanitizedUnicode()
    affiliations = fields.List(SanitizedUnicode())
    email = fields.Email()


class MetadataSchemaV1(StrictKeysMixin):
    """Schema for the record metadata."""

    id = PersistentIdentifier()
    docset_doi = SanitizedUnicode()
    docset_title = SanitizedUnicode()
    docset_abstract = SanitizedUnicode()
    docset_keywords = fields.List(SanitizedUnicode(), many=True)
    docset_notes = SanitizedUnicode()
    publication_type = SanitizedUnicode()
    publication_doi = SanitizedUnicode()
    publication_date = SanitizedUnicode()
    publication_authors = fields.List(SanitizedUnicode(), many=True)
    publication_abstract = SanitizedUnicode()
    contributors = Nested(ContributorSchemaV1, many=True)

class RecordSchemaV1(StrictKeysMixin):
    """Record schema."""

    metadata = fields.Nested(MetadataSchemaV1)
    created = fields.Str(dump_only=True)
    revision = fields.Integer(dump_only=True)
    updated = fields.Str(dump_only=True)
    links = fields.Dict(dump_only=True)
    id = PersistentIdentifier()
