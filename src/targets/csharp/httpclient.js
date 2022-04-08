const CodeBuilder = require('../../helpers/code-builder');
const helpers = require('../../helpers/headers');

function getDecompressionMethods(source) {
  const acceptEncoding = helpers.getHeader(source.allHeaders, 'accept-encoding');
  if (!acceptEncoding) {
    return []; // no decompression
  }

  const supportedMethods = {
    gzip: 'DecompressionMethods.GZip',
    deflate: 'DecompressionMethods.Deflate',
  };
  const methods = [];
  acceptEncoding.split(',').forEach(function (encoding) {
    const match = /\s*([^;\s]+)/.exec(encoding);
    if (match) {
      const method = supportedMethods[match[1]];
      if (method) {
        methods.push(method);
      }
    }
  });

  return methods;
}

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '    ',
    },
    options,
  );

  const code = new CodeBuilder(opts.indent);

  let clienthandler = '';
  const cookies = !!source.allHeaders.cookie;
  const decompressionMethods = getDecompressionMethods(source);
  if (cookies || decompressionMethods.length) {
    clienthandler = 'clientHandler';
    code.push('var clientHandler = new HttpClientHandler');
    code.push('{');
    if (cookies) {
      // enable setting the cookie header
      code.push('UseCookies = false,', 1);
    }
    if (decompressionMethods.length) {
      // enable decompression for supported methods
      code.push(`AutomaticDecompression = ${decompressionMethods.join(' | ')},`, 1);
    }
    code.push('};');
  }

  code.push(`var client = new HttpClient(${clienthandler});`);

  code.push('var request = new HttpRequestMessage');
  code.push('{');

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE'];
  let method = source.method.toUpperCase();
  if (method && methods.indexOf(method) !== -1) {
    // buildin method
    method = `HttpMethod.${method[0]}${method.substring(1).toLowerCase()}`;
  } else {
    // custom method
    method = `new HttpMethod("${method}")`;
  }
  code.push(`Method = ${method},`, 1);

  code.push(`RequestUri = new Uri("${source.fullUrl}"),`, 1);

  const headers = Object.keys(source.allHeaders).filter(function (header) {
    switch (header.toLowerCase()) {
      case 'content-type':
      case 'content-length':
      case 'accept-encoding':
        // skip these headers
        return false;
      default:
        return true;
    }
  });
  if (headers.length) {
    code.push('Headers =', 1);
    code.push('{', 1);
    headers.forEach(function (key) {
      code.push(`{ "${key}", "${source.allHeaders[key]}" },`, 2);
    });
    code.push('},', 1);
  }

  if (source.postData.text) {
    const contentType = source.postData.mimeType;
    switch (contentType) {
      case 'application/x-www-form-urlencoded':
        code.push('Content = new FormUrlEncodedContent(new Dictionary<string, string>', 1);
        code.push('{', 1);
        source.postData.params.forEach(function (param) {
          code.push(`{ "${param.name}", "${param.value}" },`, 2);
        });
        code.push('}),', 1);
        break;
      case 'multipart/form-data':
        code.push('Content = new MultipartFormDataContent', 1);
        code.push('{', 1);
        source.postData.params.forEach(function (param) {
          code.push(`new StringContent(${JSON.stringify(param.value || '')})`, 2);
          code.push('{', 2);
          code.push('Headers =', 3);
          code.push('{', 3);
          if (param.contentType) {
            code.push(`ContentType = new MediaTypeHeaderValue("${param.contentType}"),`, 4);
          }
          code.push('ContentDisposition = new ContentDispositionHeaderValue("form-data")', 4);
          code.push('{', 4);
          code.push(`Name = "${param.name}",`, 5);
          if (param.fileName) {
            code.push(`FileName = "${param.fileName}",`, 5);
          }
          code.push('}', 4);
          code.push('}', 3);
          code.push('},', 2);
        });

        code.push('},', 1);
        break;
      default:
        code.push(`Content = new StringContent(${JSON.stringify(source.postData.text || '')})`, 1);
        code.push('{', 1);
        code.push('Headers =', 2);
        code.push('{', 2);
        code.push(`ContentType = new MediaTypeHeaderValue("${contentType}")`, 3);
        code.push('}', 2);
        code.push('}', 1);
        break;
    }
  }
  code.push('};');

  // send and read response
  code.push('using (var response = await client.SendAsync(request))');
  code.push('{');
  code.push('response.EnsureSuccessStatusCode();', 1);
  code.push('var body = await response.Content.ReadAsStringAsync();', 1);
  code.push('Console.WriteLine(body);', 1);
  code.push('}');

  return code.join();
};

module.exports.info = {
  key: 'httpclient',
  title: 'HttpClient',
  link: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient',
  description: '.NET Standard HTTP Client',
};
