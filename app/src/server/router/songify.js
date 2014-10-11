var request = require('springbokjs-utils/lib/request');
var computeDrawing = require('../app/services/DrawAnalyticsService');
var songify = require('../app/services/SongifyService');
var url = require('url');

function queryEchonest (songData) {

    return request.get({
        url: url.format({
            protocol: 'http',
            host: config.ECHONEST_API_HOST,
            pathname: 'song/search',
            query: {
                api_key: config.ECHONEST_KEY,
                bucket: "id:spotify",
                rank_type: "familiarity",
                min_tempo: songData.tempoRange[0],
                max_tempo: songData.tempoRange[1]
            }
        }) + "&bucket=tracks",
        json: true
    });
}

module.exports = function(app) {
    app.post('/songify', function *(next) {
        // Retrieve drawing caracteristics
        var drawData = computeDrawing(this.request.body);

        // Retrieve song characteristics
        var songData = songify(drawData);
        console.log(songData);
        // Ask echonest !!
        var result = yield queryEchonest(songData);
        result = result.body.response.songs
            .filter(function (song) {
                return song.tracks.length;
            })
            .map(function (song) {
                return song.tracks[0];
            });
        this.body = result;
    });


    // app.post('/stats', function *(next) {
    //     this.body = analytics(this.request.body);
    // });
};
