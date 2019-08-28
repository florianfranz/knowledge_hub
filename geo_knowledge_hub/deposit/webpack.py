"""
Webpack module for Geo Knowledge Hub
"""

from flask_webpackext import WebpackBundle


js_deposit = WebpackBundle(
    __name__,
    './static/',
    entry={
        'js_deposit': ['./js/utils.js', './js/main.js']
    },
    dependencies={
        'angular': '^1.7.7',
        # File input module
        'bootstrap-fileinput': 'git://github.com/kartik-v/bootstrap-fileinput#94474f4a0f84fa35a08eb8724f8b8391c9806eb9',
        # External Invenio Files JS
        'invenio-files-js': 'git://github.com/inveniosoftware/invenio-files-js#74fbef25f2db2f39995091ed2ccb629f5ced5ac3',
        'invenio-records-js': 'git://github.com/inveniosoftware/invenio-records-js#master'
    }
)

css_deposit = WebpackBundle(
    __name__,
    './static/',
    entry={
        'css_deposit': './css/main.css'
    },
    dependencies={}
)
