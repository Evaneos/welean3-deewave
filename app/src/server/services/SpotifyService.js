var request = require('springbokjs-utils/lib/request');

export class SpotifyService {
    static getTokens(redirectUri, code) {
        return request.post({
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
                client_id: config.spotify.CLIENT_ID,
                client_secret: config.spotify.CLIENT_SECRET,
            },
            json: true
        });
    }

    static getMe(accessToken) {
        return request.get({
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true
        });
    }

    static getMyArtists(accessToken, limit = 20, offset = 0) {
        return request.get({
            url: 'https://api.spotify.com/v1/me/tracks?limit=' + limit + '&offset=' + offset,
            headers: { 'Authorization': 'Bearer ' + accessToken },
            json: true
        }).then((response) => {
            console.log(response.body);
            var artists = {};
            response.body.items.forEach((item) => {
                if (!(item.artists && item.artists.length)) {
                    return;
                }
                item.artists.forEach((artist) => {
                    if (artists[artist.id]) {
                        return;
                    }
                    artists[artist.id] = {
                        id: artist.id,
                        name: artist.name,
                        type: artist.type,
                        uri: artist.uri,
                    };
                });
            });
            return artists;
        });
    }
}
