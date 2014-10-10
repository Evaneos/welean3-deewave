require('./init');
var koa = require('koa');
var serve = require('koa-static');
var request = require('koa-request');
var app = koa();

var argv = require('minimist')(process.argv.slice(2));

app.use(function *(next){
    yield next;
    console.log('%s %s - %sms', this.method, this.url, this._requestTook);
});

// logger

app.use(function *(next){
  yield next;
  console.log('%s %s - %sms', this.method, this.url, this._requestTook);
});

// x-response-time

app.use(function *(next){
  var start = new Date();
  this._requestStartedAt = start;
  yield next;
  var ms = new Date() - start;
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
app.listen(port, console.log.bind(null, 'Listening on port ' + port));
