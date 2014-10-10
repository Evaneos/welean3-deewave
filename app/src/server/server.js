require('./init');
var fs = require('springbokjs-utils/fs');
var koa = require('koa');
var render = require('koa-ejs');
var router = require('koa-router');
var serve = require('koa-static');
var session = require('koa-session');

var errorsParser = require('springbokjs-errors');
var ErrorHtmlRenderer = require('springbokjs-errors/htmlRenderer');
var errorHtmlRenderer = new ErrorHtmlRenderer();
var path = require('path');
var app = koa();

var argv = require('minimist')(process.argv.slice(2));


process.on('uncaughtException', function(err) {
    try {
        errorsParser.log(err);
    } catch (err2) {
        console.error(err2.stack);
    }
});


// logger

app.use(function *(next){
  yield next;
  console.log('%s %s - %sms', this.method, this.url, this._requestTook);
});

// x-response-time

app.use(function *(next){
    var start = Date.now();
    this._requestStartedAt = start;
    yield next;
    var ms = Date.now() - start;
    this._requestTook = ms;
    this.set('X-Response-Time', ms + 'ms');
});

// serve static content

app.use(serve(path.join(__dirname, '../../public')));

// session

app.keys = [ config.SESSION_KEY ];
app.use(session());

// renderer

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false,
    debug: true,
    // locals: locals,
    // filters: filters
});

// error handler

app.use(function *(next) {
    try {
        yield next;
    } catch (err) {
        errorsParser.log(err);
        this.status = err.status || 500;
        if (argv.production) {
            this.body = err.message;
        } else {
            this.body = errorHtmlRenderer.render(err);
        }
        this.app.emit('error', err, this);
    }
});

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
