class PlayerManager {
    display(tracks) {
        //var accessToken = $.QueryString['accessToken'];
        //var playerContainer = document.getElementById('player-container');
        var playerLoading = document.getElementById('player-loading');
        var player = document.getElementById('player');
        playerLoading.removeAttribute('style');

        player.innerHTML = '';

        var spotifyIds = tracks.map((track) => track.foreign_id.substring(14) );
        var div = document.createElement('div');
        div.innerHTML = '<iframe width="640" height="620" src="https:/'
                + '/embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:'
                + spotifyIds.join(',') + '" frameborder="0" allowtransparency="true"></iframe>';
        player.appendChild(div);
        playerLoading.setAttribute('style', 'display: none');
    }
}

module.exports = new PlayerManager();
