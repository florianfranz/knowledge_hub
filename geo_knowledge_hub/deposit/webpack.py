"""
Webpack module for Geo Knowledge Hub
"""

from flask_assets import Bundle
from flask_webpackext import WebpackBundle


js_deposit = bundle1 = WebpackBundle(
    __name__,
    './static/',
    entry={
        'js_deposit': './js/angular/app.js'
    },
    dependencies={
        'angular': '^1.7.7',
        'angular-file-upload': '^2.5.0',
        # External Invenio Files JS
        'invenio-files-js': 'git://github.com/inveniosoftware/invenio-files-js#74fbef25f2db2f39995091ed2ccb629f5ced5ac3'
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
