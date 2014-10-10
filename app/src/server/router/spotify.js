var generators = require('springbokjs-utils/lib/generators');
var request = require('koa-request');
var querystring = require('querystring');
var SpotifyService = require('../services/SpotifyService').SpotifyService;

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

        var response = yield SpotifyService.getTokens('http://' + this.request.host + '/spotify', code);
        if (response.statusCode !== 200) {
            throw new Error(response.body);
            //return this.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
        }
        var accessToken = response.body.access_token, refreshToken = response.body.refresh_token;

        var artists = yield SpotifyService.getMyArtists(accessToken);
        console.log(artists);

        var me = yield request.get({
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true
        });
        console.log(me.body);

        // Pass the token to the browser to make requests from there
        this.redirect('/player/#' + querystring.stringify({ accessToken: accessToken, refreshToken: refreshToken }));
    });
};
