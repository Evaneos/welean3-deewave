export var singleton = true;
export var dependencies = { spotifyService: 'spotifyService', userManager: 'userManager' };

export class UserService {
    login(code, callback) {
        return this.spotifyService.getTokens(callback, code).then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(response.body);
                //return this.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
            }
            var accessToken = response.body.access_token;
            var me;
            return this.spotifyService.getMe().then((result) => me = result).then(() => {
                return this.userManager.findOne().byId(me.body.id).fetch();
            }).then((user) => {

                var toInsert = false;
                if (!user) {
                    toInsert = true;
                    user = this.di.createInstance('User');
                    user.set('_id', me.body.id);
                    //var artists = yield di.spotifyService.getMyArtists(accessToken);
                    //console.log(artists);
                }

                user.set('displayName', me.body.display_name);
                user.set('email', me.body.email);
                user.set('product', me.body.product);
                user.set('type', me.body.type);

                user.set('lastConnection', new Date());
                user.set('refreshToken', me.body.refreshToken);
                user.set('accessToken', me.body.accessToken);

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
