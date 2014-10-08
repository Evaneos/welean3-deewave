require('./init');
var koa = require('koa');
var serve = require('koa-static');
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

app.use(function *(){
  this.body = 'Hello World';
});


var port = argv.port || 3000;
app.listen(port, console.log.bind(null, 'Listening on port ' + port));
