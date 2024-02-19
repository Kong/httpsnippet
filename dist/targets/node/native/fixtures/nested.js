"use strict";
var http = require('http');
var options = {
    method: 'GET',
    hostname: 'mockbin.com',
    port: null,
    path: '/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value',
    headers: {}
};
var req = http.request(options, function (res) {
    var chunks = [];
    res.on('data', function (chunk) {
        chunks.push(chunk);
    });
    res.on('end', function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});
req.end();
