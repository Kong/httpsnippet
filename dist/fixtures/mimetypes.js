"use strict";
exports.__esModule = true;
exports.mimetypes = void 0;
exports.mimetypes = {
    'multipart/mixed': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'multipart/mixed',
            text: ''
        }
    },
    'multipart/related': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'multipart/related',
            text: ''
        }
    },
    'multipart/form-data': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'multipart/form-data',
            text: ''
        }
    },
    'multipart/alternative': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'multipart/alternative',
            text: ''
        }
    },
    'application/x-www-form-urlencoded': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'application/x-www-form-urlencoded',
            text: ''
        }
    },
    'text/json': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'text/json',
            text: ''
        }
    },
    'text/x-json': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'text/x-json',
            text: ''
        }
    },
    'application/x-json': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'application/x-json',
            text: ''
        }
    },
    'invalid-json': {
        method: 'POST',
        url: 'http://mockbin.com/har',
        postData: {
            mimeType: 'application/json',
            text: 'foo/bar'
        }
    }
};
