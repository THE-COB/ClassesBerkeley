const express = require('express');
const createProxyMiddleware = require('http-proxy-middleware');
const app = express();

module.exports = function(app) {
  app.use(
    '/search/class',
    createProxyMiddleware({
      target: 'https://classes.berkeley.edu',
      changeOrigin: true,
    })
  );
  app.listen(3000);
};