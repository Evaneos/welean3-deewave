var User = require('../modules/user/User').User;


export class UserService {
    login(code, callback) {
        return this.spotifyService.getTokens(callback, code).then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(response.body);
                //return this.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
            }
            var accessToken = response.body.access_token;
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
                user.set('refreshToken', me.refreshToken);
                user.set('accessToken', me.accessToken);

                if (toInsert) {
                    return this.createProfile(accessToken).then((profilId) => {
                        return this.userManager.insert(user);
                    });
                } else {
                    return this.userManager.update(user);
                }
            }).then(() => accessToken);
        });
    }

    createProfile(accessToken) {
        return this.spotifyService.getMyArtists(accessToken).then((artists) => {
            console.log(artists);

        });
    }
}

module.exports = new UserService();
module.exports.spotifyService = require('./SpotifyService');
module.exports.userManager = require('../modules/user/UserManager');
