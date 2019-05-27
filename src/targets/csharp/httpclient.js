'use strict'

var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const code = new CodeBuilder('    ')
  const opts = Object.assign({
    showBoilerplate: true,
    printBody: true
  }, options)
  const methodsWithBody = ['POST', 'PUT', 'DELETE', 'PATCH']
  const method = source.method.toUpperCase()
  const methodEnum = {
    'GET': 'HttpMethod.Get',
    'POST': 'HttpMethod.Post',
    'PUT': 'HttpMethod.Put',
    'DELETE': 'HttpMethod.Delete',
    'PATCH': 'HttpMethod.Patch',
    'HEAD': 'HttpMethod.Head',
    'OPTIONS': 'HttpMethod.Options'
  }

  if (!methodEnum[method]) {
    return `${method} method not supported`
  }

  // Must disable the default cookie handler to pass our own cookie header per request
  // note: a CookieContainer can be used instead and cookies added to it,
  // but caching cookies between requests, similar to default headers, may not be wanted
  const clientInit = source.cookies.length
    ? 'new HttpClient(new HttpClientHandler { UseCookies = false })'
    : 'new HttpClient()'

  let indent = 0
  if (opts.showBoilerplate) {
    code.push(indent, 'using System;')
    code.push(indent, 'using System.Net.Http;')
    code.push(indent, 'using System.Text;')
    code.push(indent, 'using System.Threading.Tasks;')
    code.blank()
    code.push(indent, 'class Snippet')
    code.push(indent, '{')
    indent += 1
    // it is best practice to have one or a limited number of HttpClient for the lifetime of an app
    // see for details https://docs.microsoft.com/en-us/azure/architecture/antipatterns/improper-instantiation/
    code.push(indent, 'static HttpClient client = %s;', clientInit)
    code.blank()
    code.push(indent, 'static async Task MainAsync()')
    code.push(indent, '{')
    indent += 1
  } else {
    code.push(indent, 'var client = %s;', clientInit)
  }

  // Create request
  code.push(indent, 'var request = new HttpRequestMessage(%s, "%s");',
    methodEnum[method], source.fullUrl)

  // Add headers
  // note: client.DefaultRequestHeaders can be used for every request,
  // but here headers will be specific to each request;
  // the content-type header will be added with body
  const headers = Object.keys(source.allHeaders).filter(v => v !== 'content-type')
  if (headers.length) {
    headers.forEach(key =>
      code.push(indent, 'request.Headers.Add("%s", "%s");', key, source.allHeaders[key]))
  }

  // Add body
  if (source.postData.text && methodsWithBody.indexOf(method) >= 0) {
    code.push(indent, 'request.Content = new StringContent(%s,',
      JSON.stringify(source.postData.text))
    code.push(indent + 1, 'Encoding.UTF8, "%s");', source.allHeaders['content-type'])
  }

  code.blank()

  // Send request
  code.push(indent, 'var response = await client.SendAsync(request);')

  // Read data
  if (method !== 'HEAD' && opts.printBody) {
    code.push(indent, 'var content = await response.Content.ReadAsStringAsync();')
    code.push(indent, 'Console.WriteLine(content);')
  }

  if (opts.showBoilerplate) {
    indent -= 1
    code.push(indent, '}')
    code.blank()
    code.push(indent, 'static void Main(string[] args)')
    code.push(indent, '{')
    code.push(indent + 1, 'MainAsync().Wait();')
    code.push(indent, '}')
    indent -= 1
    code.push(indent, '}')
  }

  return code.join()
}

module.exports.info = {
  'key': 'httpclient',
  'title': 'HttpClient',
  'link': 'https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=netstandard-2.0',
  'description': 'System.Net.Http.HttpClient'
}
