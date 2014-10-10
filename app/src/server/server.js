/*

8888888b.                    888       888
888  "Y88b                   888   o   888
888    888                   888  d8b  888
888    888  .d88b.   .d88b.  888 d888b 888  8888b.  888  888  .d88b.
888    888 d8P  Y8b d8P  Y8b 888d88888b888     "88b 888  888 d8P  Y8b
888    888 88888888 88888888 88888P Y88888 .d888888 Y88  88P 88888888
888  .d88P Y8b.     Y8b.     8888P   Y8888 888  888  Y8bd8P  Y8b.
8888888P"   "Y8888   "Y8888  888P     Y888 "Y888888   Y88P    "Y8888

                                                > Draw, listen, enjoy!
*/

require('./init');
var fs = require('springbokjs-utils/fs');
var koa = require('koa');
var router = require('koa-router');
var serve = require('koa-static');
var session = require('koa-session');

var errorsParser = require('springbokjs-errors');
var path = require('path');
var app = koa();

var argv = require('minimist')(process.argv.slice(2));

require('./helpers')(app, argv);

// serve static content

app.use(serve(path.join(__dirname, '../../public')));

// session

app.keys = [ config.SESSION_KEY ];
app.use(session());

// router

app.use(router(app));

// response

fs.readRecursiveDirectory(__dirname + '/router', { recursive: false, directories: false }, function(file) {
    if (file.filename.slice(-3) !== '.js') {
        return;
    }
    return require(file.path)(app);
}).then(() => {
    var port = argv.port || 3000;

    app.listen(argv['socket-path'] || port, function() {
        if (argv['socket-path']) {
            fs.chmodSync(argv['socket-path'], '777');
        }
        logger.log('Listening on '
                +(argv['socket-path'] ? ' socket path ' + argv['socket-path'] : 'port ' + port));
    });
}).catch((err) => {
    errorsParser.log(err);
});
