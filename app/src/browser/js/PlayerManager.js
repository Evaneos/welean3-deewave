class PlayerManager {
	display (tracks) {
		var accessToken = $.QueryString['accessToken'];
		var results = document.getElementById('player-container');
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
				results.innerHTML = '';
				var fragment = document.createDocumentFragment();
				response.tracks.forEach(function (track) {
					var a = document.createElement('a');
					a.setAttribute('style', 'background-image:url(' + track.album.images[0].url + ')');
					a.setAttribute('href', track.external_urls.spotify);
					a.innerHTML = track.name;
					a.setAttribute('class', 'cover');
					fragment.appendChild(a);
				});
				results.appendChild(fragment);
			}
		});
	}
}

module.exports = new PlayerManager();