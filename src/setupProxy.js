const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/search/class/', createProxyMiddleware({target: 'https://classes.berkeley.edu', changeOrigin: true}));
};