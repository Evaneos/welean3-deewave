var generators = require('springbokjs-utils/lib/generators');
var querystring = require('querystring');
var userService = require('../app/services/UserService');

module.exports = function(app) {
    app.get('/spotify/login', function *(next) {
        var state = generators.randomCode(16);
        this.session.spotifyAuthState = state;

        var scope = 'user-read-private playlist-read-private user-library-read';
        this.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: config.spotify.CLIENT_ID,
                scope: scope,
                redirect_uri: 'http://' + this.request.host + '/spotify',
                state: state
            })
        );
    });

    app.get('/spotify', function *(next) {
        var code = this.request.query.code || null;
        var state = this.request.query.state || null;

        var storedState = this.session.spotifyAuthState;

        if (state === null || state !== storedState) {
            return this.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
        }

        delete this.session.spotifyAuthState;


        var user = yield userService.login(code, 'http://' + this.request.host + '/spotify');
        this.session.accessToken = user.get('accessToken');
        this.session.userId = user.id;

        // Pass the token to the browser to make requests from there
        this.redirect('/player/#' + querystring.stringify({ accessToken: user.get('accessToken') }));
    });
};
