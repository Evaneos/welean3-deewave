// logger
module.exports = function(app) {
    app.use(function *(next){
        yield next;
        console.log('%s %s - %sms', this.method, this.url, this._requestTook);
    });
};
