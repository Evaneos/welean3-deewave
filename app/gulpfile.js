var gulp = require('gulp');
var pkg = require('./package.json');
require('springbokjs-base/gulptask.js')(pkg, gulp, {
    generatorsTranspilationEnabled: false,
    traceurEnabled: false,
    paths: {
        browser: {
            mainscripts: [
                'deewave.js',
                'draw.js'
            ]
        }
    },
    src: {
        css: [
            // here put css files from bower or node_modules or other assets,
            // included before the main less file in src/browser/less/main.less.
        ],
        js: {
            'deewave.js': [
                // here put js files from bower or node_modules or other assets,
                // included before files from src/browser/js/ folder.
                'node_modules/springbokjs-shim/init.js',
                //'node_modules/ejs/ejs.min.js'
            ],
            'draw.js': []
        }
    },
    jshintBrowserOptions: {
        "predef": [ "S", "$" ]
    },
    jshintServerOptions: {
        "predef": [ "S", "logger", "config" ]
    },
});
