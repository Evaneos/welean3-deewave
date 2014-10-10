module.exports = function(app) {
    require ('./logger')(app);
    require ('./renderer')(app);
    require ('./xresponsetime')(app);
    require ('./error-handler')(app);
};
