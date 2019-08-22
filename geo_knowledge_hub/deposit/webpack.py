"""
Webpack module for Geo Knowledge Hub
"""

from flask_assets import Bundle
from flask_webpackext import WebpackBundle


js_deposit = bundle1 = WebpackBundle(
    __name__,
    './static/',
    entry={
        'js_deposit': ['./js/utils.js', './js/main.js']
    },
    dependencies={
        # File input module
        'bootstrap-fileinput': 'git://github.com/kartik-v/bootstrap-fileinput#94474f4a0f84fa35a08eb8724f8b8391c9806eb9',
        # External Invenio Files JS
        'invenio-files-js': 'git://github.com/inveniosoftware/invenio-files-js#74fbef25f2db2f39995091ed2ccb629f5ced5ac3'
    }
)

