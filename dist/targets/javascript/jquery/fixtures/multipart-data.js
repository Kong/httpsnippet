"use strict";
var form = new FormData();
form.append('foo', 'Hello World');
form.append('bar', 'Bonjour le monde');
var settings = {
    async: true,
    crossDomain: true,
    url: 'http://mockbin.com/har',
    method: 'POST',
    headers: {},
    processData: false,
    contentType: false,
    mimeType: 'multipart/form-data',
    data: form
};
$.ajax(settings).done(function (response) {
    console.log(response);
});
