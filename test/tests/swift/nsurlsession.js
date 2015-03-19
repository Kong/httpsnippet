/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should support an indent option', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('swift', {
      indent: '    '
    })

    result.should.be.a.String
    result.replace(/\n/g, '').should.eql('import Foundationvar request = NSMutableURLRequest(URL: NSURL(string: "http://mockbin.com/har")!,                                        cachePolicy: .UseProtocolCachePolicy,                                    timeoutInterval: 10.0)request.HTTPMethod = "GET"let session = NSURLSession.sharedSession()let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in    if (error != nil) {        println(error)    } else {        let httpResponse = response as? NSHTTPURLResponse        println(httpResponse)    }})dataTask.resume()')
  })
  it('should support a timeout option', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('swift', {
      timeout: 5
    })

    result.should.be.a.String
    result.replace(/\n/g, '').should.eql('import Foundationvar request = NSMutableURLRequest(URL: NSURL(string: "http://mockbin.com/har")!,                                        cachePolicy: .UseProtocolCachePolicy,                                    timeoutInterval: 5.0)request.HTTPMethod = "GET"let session = NSURLSession.sharedSession()let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in  if (error != nil) {    println(error)  } else {    let httpResponse = response as? NSHTTPURLResponse    println(httpResponse)  }})dataTask.resume()')
  })
  it('should support pretty option', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('swift', {
      pretty: false
    })

    result.should.be.a.String
    result.replace(/\n/g, '').should.eql('import Foundationlet headers = ["cookie": "foo=bar; bar=baz", "accept": "application/json", "content-type": "application/x-www-form-urlencoded"]var postData = NSMutableData(data: "foo=bar".dataUsingEncoding(NSUTF8StringEncoding)!)var request = NSMutableURLRequest(URL: NSURL(string: "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")!,                                        cachePolicy: .UseProtocolCachePolicy,                                    timeoutInterval: 10.0)request.HTTPMethod = "POST"request.allHTTPHeaderFields = headersrequest.HTTPBody = postDatalet session = NSURLSession.sharedSession()let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in  if (error != nil) {    println(error)  } else {    let httpResponse = response as? NSHTTPURLResponse    println(httpResponse)  }})dataTask.resume()')
  })
}
