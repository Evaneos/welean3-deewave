class PlayerManager {
	display (tracks) {
		var accessToken = $.QueryString['accessToken'];
		var results = document.querySelector('.player-playlist');
		var spotifyIds = tracks.map( (track) => track.foreign_id.substring(14) ).reduce( (acc, id) => (acc) ? acc + ',' + id : id);
		console.log(spotifyIds);
		$.ajax({
			method: 'GET',
			url: 'https://api.spotify.com/v1/tracks',
			headers: (accessToken) ? {'Authorization': 'Bearer ' + accessToken } : {},
			data: {
				ids: spotifyIds
			},
			success: function (response) {
				console.log('response', response);
				results.innerHTML = '';
				var fragment = document.createDocumentFragment();
				response.tracks.forEach(function (track) {

					var item = document.createElement('tr');

					var tpl = '';
					tpl+= '<td><a href="' + track.external_urls.spotify + '"><img src="' + track.album.images[2].url + '"></a></td>';
					tpl+= '<td>' + track.name + '</td>';

					item.innerHTML = tpl;

					fragment.appendChild(item);
				});
				results.appendChild(fragment);
			}
		});
	}
}

module.exports = new PlayerManager();