var gulp = require('gulp');
var pkg = require('./package.json');
require('springbokjs-base/gulptask.js')(pkg, gulp, {
    src: {
        css: [
            // here put css files from bower or node_modules or other assets,
            // included before the main less file in src/browser/less/main.less.
        ],
        js: [
            // here put js files from bower or node_modules or other assets,
            // included before files from src/browser/js/ folder.
            'node_modules/springbokjs-shim/init.js',
            //'node_modules/ejs/ejs.min.js'
        ]
    },
    jshintBrowserOptions: {
        "predef": [ "S" ]
    },
    jshintServerOptions: {
        "predef": [ "S" ]
    },
});


