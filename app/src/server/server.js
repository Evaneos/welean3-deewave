require('./init');
var fs = require('springbokjs-utils/fs');
var koa = require('koa');
var router = require('koa-router');
var serve = require('koa-static');
var session = require('koa-session');

var errorsParser = require('springbokjs-errors');
var ErrorHtmlRenderer = require('springbokjs-errors/htmlRenderer');
var errorHtmlRenderer = new ErrorHtmlRenderer();
var path = require('path');
var app = koa();

var argv = require('minimist')(process.argv.slice(2));

require('./helpers')(app);

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
