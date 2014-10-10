module.exports = function(app, argv) {
    require('./logger')(app, argv);
    require('./renderer')(app, argv);
    require('./xresponsetime')(app, argv);
    require('./error-handler')(app, argv);
};
