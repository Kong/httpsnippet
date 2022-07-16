import type { Request } from '..';

export const mimetypes = {
  'multipart/mixed': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'multipart/mixed',
      text: '',
    },
  } as Request,

  'multipart/related': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'multipart/related',
      text: '',
    },
  } as Request,

  'multipart/form-data': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'multipart/form-data',
      text: '',
    },
  } as Request,

  'multipart/alternative': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'multipart/alternative',
      text: '',
    },
  } as Request,

  'application/x-www-form-urlencoded': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'application/x-www-form-urlencoded',
      text: '',
    },
  } as Request,

  'text/json': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'text/json',
      text: '',
    },
  } as Request,

  'text/x-json': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'text/x-json',
      text: '',
    },
  } as Request,

  'application/x-json': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'application/x-json',
      text: '',
    },
  } as Request,

  'invalid-json': {
    method: 'POST',
    url: 'https://httpbin.org/anything',
    postData: {
      mimeType: 'application/json',
      text: 'foo/bar',
    },
  } as Request,
};
