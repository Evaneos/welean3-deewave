var User = require('../modules/user/User').User;

export class UserService {
    login(code, callback) {
        return this.spotifyService.getTokens(callback, code).then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(response.body);
                //return this.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
            }
            var accessToken = response.body.access_token, refreshToken = response.body.refresh_token;
            var me;
            return this.spotifyService.getMe(accessToken).then((result) => {
                me = result.body;
            }).then(() => {
                console.log(me);
                return this.userManager.findOneById(me.id);
            }).then((user) => {
                var toInsert = false;
                if (!user) {
                    toInsert = true;
                    user = new User();
                    user.set('_id', me.id);
                    //var artists = yield di.spotifyService.getMyArtists(accessToken);
                    //console.log(artists);
                }

                user.set('displayName', me.display_name);
                user.set('email', me.email);
                user.set('product', me.product);
                user.set('type', me.type);

                user.set('lastConnection', new Date());
                user.set('refreshToken', refreshToken);
                user.set('accessToken', accessToken);

                if (toInsert) {
                    return this.createProfile(user, me, accessToken).then(() => {
                        return this.userManager.insert(user).then(() => user);
                    });
                } else {
                    return this.userManager.update(user).then(() => user);
                }
            });
        });
    }

    createProfile(user, userData, accessToken) {
        return this.echoNestService.createProfile(userData.id).then((profileId) => {
            console.log(profileId);
            user.set('profileId', profileId);
            var data = {
                type: 'user'
            };
            if (userData.country) {
                data._country_code = userData.country;
            }
            return this.echoNestService.updateProfile(profileId, data);
        }).then(() => {
            return this.spotifyService.getMyArtists(accessToken);
        }).then((artists) => {
            return this.echoNestService.update(user.get('profileId'), Object.keys(artists).map((artistId) => {
                var artist = artists[artistId];
                return {
                    item_id: 'artist_' + artist.id,
                    artist_id: artist.id,
                    artist_name: artist.name,
                    url: artist.url
                };
            })).then(() => {
                return S.promiseCallback((done) => setTimeout(done, 600));
            });
        });
    }
}

module.exports = new UserService();
module.exports.echoNestService = require('./EchoNestService');
module.exports.spotifyService = require('./SpotifyService');
module.exports.userManager = require('../modules/user/UserManager');
