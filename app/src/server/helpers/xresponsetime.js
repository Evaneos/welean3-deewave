// x-response-time
//
module.exports = function(app) {
    app.use(function *(next){
        var start = Date.now();
        this._requestStartedAt = start;
        yield next;
        var ms = Date.now() - start;
        this._requestTook = ms;
        this.set('X-Response-Time', ms + 'ms');
  });
};
