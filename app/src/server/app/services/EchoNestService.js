var request = require('springbokjs-utils/lib/request');

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
            console.log(url, form, response.body);
            return response;
        });
    }

    updateProfile(id, data) {
        return this._postApi(
            'tasteprofile/update',
            {
                id: id,
                action: 'update',
                data: JSON.stringify({
                    catalog_keyvalues: data
                })
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
            { id: id },
            {
                action: 'skip',
                item: item
            }
        );
    }

    delete(id, item) {
        return this._postApi('tasteprofile/update',
            { id: id },
            {
                action: 'delete',
                item: item
            }
        );
    }
}

module.exports = new EchoNestService();
