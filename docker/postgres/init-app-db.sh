#!/usr/bin/env bash
# -*- coding: utf-8 -*-
#
# Copyright (C) 2019 GEO.
#
# GEO Knowledge Hub is free software; you can redistribute it and/or modify
# it under the terms of the MIT License; see LICENSE file for more details.

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE ROLE geo-knowledge-hub WITH LOGIN PASSWORD 'geo-knowledge-hub';
    ALTER ROLE geo-knowledge-hub CREATEDB;
    \du;
EOSQL
