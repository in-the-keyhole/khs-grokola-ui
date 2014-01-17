'use strict';

var settings = require('nconf').argv().env({ separator: '__' }).file({ file: __dirname + '/config/config.json' }),
    express = require('express'),
    site = express(),
    proxy = require('http-proxy'),
    apiProxy = new proxy.RoutingProxy(),
    historyApiFallback = require('connect-history-api-fallback');

site.use(express.logger());
site.all('/sherpa*', function (req, res) {
    req.url = "/" + settings.get('api:context') + req.url;
    apiProxy.proxyRequest(req, res, { host: settings.get('api:host'), port: settings.get('api:port') });
});
site.use(historyApiFallback);
site.use(express.static(__dirname + '/../client'));

site.listen(settings.get('http:port'));