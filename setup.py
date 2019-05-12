# -*- coding: utf-8 -*-
#
# Copyright (C) 2019 GEO.
#
# GEO Knowledge Hub is free software; you can redistribute it and/or modify
# it under the terms of the MIT License; see LICENSE file for more details.

"""Knowledge Hub for GEOSS (Global Earth Observation System of Systems)"""

import os

from setuptools import find_packages, setup

readme = open('README.rst').read()

packages = find_packages()

# Get the version string. Cannot be done with import!
g = {}
with open(os.path.join('geo_knowledge_hub', 'version.py'), 'rt') as fp:
    exec(fp.read(), g)
    version = g['__version__']

setup(
    name='geo-knowledge-hub',
    version=version,
    description=__doc__,
    long_description=readme,
    keywords='geo-knowledge-hub Invenio',
    license='MIT',
    author='GEO',
    author_email='geokhub@geosec.org',
    url='https://github.com/geosec/knowledge_hub',
    packages=packages,
    zip_safe=False,
    include_package_data=True,
    platforms='any',
    entry_points={
        'console_scripts': [
            'geo-knowledge-hub = invenio_app.cli:cli',
        ],
        'invenio_base.apps': [
            'geo_knowledge_hub_records = geo_knowledge_hub.records:GEOKnowledgeHub',
        ],
        'invenio_base.blueprints': [
            'geo_knowledge_hub = geo_knowledge_hub.theme.views:blueprint',
            'geo_knowledge_hub_records = geo_knowledge_hub.records.views:blueprint',
        ],
        'invenio_assets.webpack': [
            'geo_knowledge_hub_theme = geo_knowledge_hub.theme.webpack:theme',
        ],
        'invenio_config.module': [
            'geo_knowledge_hub = geo_knowledge_hub.config',
        ],
        'invenio_i18n.translations': [
            'messages = geo_knowledge_hub',
        ],
        'invenio_base.api_apps': [
            'geo_knowledge_hub = geo_knowledge_hub.records:GEOKnowledgeHub',
         ],
        'invenio_jsonschemas.schemas': [
            'geo_knowledge_hub = geo_knowledge_hub.records.jsonschemas'
        ],
        'invenio_search.mappings': [
            'records = geo_knowledge_hub.records.mappings'
        ],
    },
    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Development Status :: 3 - Alpha',
    ],
)
