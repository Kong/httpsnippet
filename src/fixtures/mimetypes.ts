import type { Request } from '../httpsnippet.js';

export const mimetypes = {
  'multipart/mixed': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'multipart/mixed',
      text: '',
    },
  } as Request,

  'multipart/related': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'multipart/related',
      text: '',
    },
  } as Request,

  'multipart/form-data': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'multipart/form-data',
      text: '',
    },
  } as Request,

  'multipart/alternative': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'multipart/alternative',
      text: '',
    },
  } as Request,

  'application/x-www-form-urlencoded': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'application/x-www-form-urlencoded',
      text: '',
    },
  } as Request,

  'text/json': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'text/json',
      text: '',
    },
  } as Request,

  'text/x-json': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'text/x-json',
      text: '',
    },
  } as Request,

  'application/x-json': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'application/x-json',
      text: '',
    },
  } as Request,

  'invalid-json': {
    method: 'POST',
    url: 'http://mockbin.com/har',
    postData: {
      mimeType: 'application/json',
      text: 'foo/bar',
    },
  } as Request,
};
