module.exports = function(app) {
    app.get('/', function *(next) {
        if (this.session.accessToken) {
            return this.redirect('/player');
        }
        yield this.render('home', {
        });
    });
};
