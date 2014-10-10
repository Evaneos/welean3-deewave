// renderer
var render = require('koa-ejs');
var path = require('path');

module.exports = function(app) {
  console.log(__dirname);
    render(app, {
        root: path.join(__dirname, '../views'),
        layout: 'template',
        viewExt: 'ejs',
        cache: false,
        debug: true,
        // locals: locals,
        // filters: filters
    });
};