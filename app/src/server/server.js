require('./init');
var fs = require('fs');
var koa = require('koa');
var serve = require('koa-static');
var request = require('koa-request');
var errorsParser = require('springbokjs-errors');
var ErrorHtmlRenderer = require('springbokjs-errors/htmlRenderer');
var errorHtmlRenderer = new ErrorHtmlRenderer();
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


// response

app.use(function *() {

    var options = {
        url: config.ECHONEST_API_URL + 'song/search?api_key=' + config.ECHONEST_KEY + '&format=json&artist=radiohead&title=karma%20police',
        headers: { 'User-Agent': 'request' }
    };

    var response = yield request(options);
    var info = JSON.parse(response.body);

    this.body = info;
});


var port = argv.port || 3000;

app.listen(argv['socket-path'] || port, function() {
    if (argv['socket-path']) {
        fs.chmodSync(argv['socket-path'], '777');
    }
    logger.log('Listening on '
            +(argv['socket-path'] ? ' socket path ' + argv['socket-path'] : 'port ' + port));
});
