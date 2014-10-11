// error handler
var errorsParser = require('springbokjs-errors');
var ErrorHtmlRenderer = require('springbokjs-errors/htmlRenderer');
var errorHtmlRenderer = new ErrorHtmlRenderer();

if (config.realRootPath) {
    errorsParser.setPathMapping('/weleanit-music/', config.realRootPath);
}

/**
 * Catch all exceptions
 */
process.on('uncaughtException', function(err) {
    try {
        errorsParser.log(err);
    } catch (err2) {
        console.error(err2.stack);
    }
});

module.exports = function(app, argv) {
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
};
