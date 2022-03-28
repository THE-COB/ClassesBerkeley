const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/search', createProxyMiddleware({target: 'https://classes.berkeley.edu', changeOrigin: true}));
};