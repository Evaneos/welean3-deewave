var isAuthenticated = require('../helpers/authentication').isAuthenticated;

module.exports = function(app) {
    app.get('/player',  isAuthenticated, function *(next) {
        /*var options = {
            url: config.ECHONEST_API_URL + 'song/search?api_key=' + config.ECHONEST_KEY +
                    '&format=json&artist=radiohead&title=karma%20police',
            headers: { 'User-Agent': 'request' }
        };

        var response = yield request(options);
        var info = JSON.parse(response.body);
*/
        yield this.render('draw', {
            //info: info,
        });
    });
};
