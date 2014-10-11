// check if authentificated
module.exports = {
	isAuthenticated: function *(next) {
		if (!this.session.userId) {
			this.redirect('/spotify/login');
			return;
		}
		yield next;
	}
};
