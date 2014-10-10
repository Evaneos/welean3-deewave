module.exports = function(app) {
    app.get('/player', function *(next) {
        this.body = 'bouh';
    });
};
