var http = require('http');

module.exports = {
    get: function(callback) {
        var req = http.request({
            hostname: 'https://gw.cmtelecom.com',
            path: '/v1.0/message'
        }, function(response) {
            var data = '';
            response.on('data', function(chunk) {
                data += chunk;
            });

            response.on('end', function() {
                callback(null, JSON.parse(data));
            });
        });

        req.on('error', function (err) {
            callback(err);
        });
        req.end();
    },

    post: function(data, callback) {

        var req = http.request({
            hostname: 'https://gw.cmtelecom.com',
            path: '/v1.0/message',
            method: 'POST'
        }, function(response) {
            var data = '';
            response.on('data', function(chunk) {
                data += chunk;
            });

            response.on('end', function() {
                callback(null, JSON.parse(data));
            });
        });

        req.write(JSON.stringify(data));

        req.end();
    }
};