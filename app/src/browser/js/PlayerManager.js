
export class PlayerManager {

	display (tracks) {
		var results = document.getElementById('player-container');
		$.ajax({
			method: 'GET',
			url: 'https://api.spotify.com/v1/tracks',
			headers: {
			    'Authorization': 'Bearer ' + $.QueryString['accessToken']
			},
			data: {
				ids: tracks.map( (track) => track.foreign_id ) 
			},
			success: function (response) {
				results.innerHTML = '';
				var fragment = document.createDocumentFragment();
				response.tracks.forEach(function (track) {
					var a = document.createElement('a');
					a.setAttribute('style', 'background-image:url(' + track.album.images[0].url + ')');
					a.setAttribute('href', track.external_urls);
					a.setAttribute('class', 'cover');
					fragment.appendChild(a);
				});
				results.appendChild(fragment);
			}
		});
	}
}