var request = require('springbokjs-utils/lib/request');
var url = require('url');

export class EchoNestService {

    createProfile(name) {
        return request.post({
            url: config.ECHONEST_API_URL + 'tasteprofile/create',
            form: {
                api_key: config.ECHONEST_KEY,
                type: 'artist',
                name: name
            },
            json: true
        }).then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(JSON.stringify(response.body));
            }
            if (response.body.response.status && response.body.response.status.id) {
                return response.body.response.status.id;
            }
            return response.body.response.id;
        });
    }

    _postApi(url, form) {
        form.api_key = config.ECHONEST_KEY;
        return request.post({
            url: config.ECHONEST_API_URL + url,
            form: form,
            json: true
        }).then((response) => {
            if (response.statusCode !== 200) {
                throw new Error(url + ': ' + JSON.stringify(response.body));
            }
        });
    }

    updateProfile(id, data) {
        return this._postApi(
            'tasteprofile/update',
            {
                id: id,
                data: JSON.stringify([{
                    action: 'update',
                    catalog_keyvalues: data
                }])
            }
        );
    }

    update(id, items) {
        if (!Array.isArray(items)) {
            items = [ items ];
        }
        return this._postApi(
            'tasteprofile/update',
            {
                id: id,
                data: JSON.stringify(items.map((item) => {
                    return {
                        action: 'update',
                        item: item
                    };
                }))
            }
        );
    }

    getSongs(songQuery, id) {

        var query = {
            api_key: config.ECHONEST_KEY,
            min_danceability: songQuery.danceabilityRange[0],
            max_danceability: songQuery.danceabilityRange[1],
            min_energy: songQuery.energyRange[0],
            max_energy: songQuery.energyRange[1],
            sort: 'song_hotttnesss-desc',
            limit: 'true'
        };
        if (songQuery.mood) {
            query.mood = songQuery.mood + '^1';
        }
        return request.get({
            url: url.format({
                protocol: 'http',
                host: config.ECHONEST_API_HOST,
                pathname: 'song/search',
                query: query 
            }) + "&bucket=tracks&bucket=id:spotify",
            json: true
        }).then( (result) => {
            return result.body.response.songs
                .filter((song) => song.tracks.length)
                .map((song) => song.tracks[0]);
        });
    }


    play(id, item) {
        return this._postApi('tasteprofile/update',
            {
                id: id,
                action: 'play',
                item: item
            }
        );
    }

    skip(id, item) {
        return this._postApi('tasteprofile/update',
            {
                id: id,
                action: 'skip',
                item: item
            }
        );
    }

    delete(id, item) {
        return this._postApi('tasteprofile/update',
            {
                id: id,
                action: 'delete',
                item: item
            }
        );
    }
}

module.exports = new EchoNestService();
