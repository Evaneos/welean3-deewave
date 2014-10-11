class PlayerManager {
	display (tracks) {
		var results = document.getElementById('player-container');
		var spotifyIds = tracks.map( (track) => track.foreign_id);
		results.innerHTML = '';
		var fragment = document.createDocumentFragment();
		spotifyIds.forEach(function (track) {
			var div = document.createElement('div');
			var innerHTML = "<iframe src=\"https://embed.spotify.com/?uri=spotify:track:" +
				track + 
				"\" width=\"500\" height=\"80\" frameborder=\"0\" allowtransparency=\"true\"></iframe>";
			div.innerHTML = innerHTML;
			fragment.appendChild(div);
		});
		results.appendChild(fragment);
			// }
		// });
	}
}

module.exports = new PlayerManager();