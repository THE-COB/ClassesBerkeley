const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/search/class', {target: 'https://classes.berkeley.edu', changeOrigin: true}));
};