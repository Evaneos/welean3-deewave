var computeDrawing = require('../app/services/DrawAnalyticsService');
var songify = require('../app/services/SongifyService');
var echoNestService = require('../app/services/EchoNestService');
var userManager = require('../app/modules/user/UserManager');
var isAuthenticated = require('../helpers/authentication').isAuthenticated;

module.exports = function(app) {
    app.post('/songify', isAuthenticated, function *(next) {
        var user = yield userManager.findOneById(this.session.userId);
        // Retrieve drawing caracteristics
        var drawData = computeDrawing(this.request.body);
        console.log(drawData);
        // Retrieve song characteristics
        var songQuery = songify(drawData);

        // Ask echonest !!
        var result = yield echoNestService.getSongs(songQuery, user.get('profileId'));
        this.body = result;
    });

};
