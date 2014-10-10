require('./init');
var fs = require('springbokjs-utils/fs');
var koa = require('koa');
var serve = require('koa-static');
var router = require('koa-router');
var errorsParser = require('springbokjs-errors');
var ErrorHtmlRenderer = require('springbokjs-errors/htmlRenderer');
var errorHtmlRenderer = new ErrorHtmlRenderer();
var render = require('koa-ejs');
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

app.use(serve(path.join(__dirname, '../../public')));

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

