/**
 * @description
 * HTTP code snippet generator for Swift using NSURLSession.
 *
 * @author
 * @thibaultCha
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const helpers = require('./helpers');
const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '  ',
      pretty: true,
      timeout: '10',
    },
    options,
  );

  const code = new CodeBuilder({ indent: opts.indent });

  // Markers for headers to be created as litteral objects and later be set on the NSURLRequest if exist
  const req = {
    hasHeaders: false,
    hasBody: false,
  };

  // We just want to make sure people understand that is the only dependency
  code.push('import Foundation');

  if (Object.keys(source.allHeaders).length) {
    req.hasHeaders = true;
    code.blank().push(helpers.literalDeclaration('headers', source.allHeaders, opts));
  }

  if (source.postData.text || source.postData.jsonObj || source.postData.params) {
    req.hasBody = true;

    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        // By appending parameters one by one in the resulting snippet,
        // we make it easier for the user to edit it according to his or her needs after pasting.
        // The user can just add/remove lines adding/removing body parameters.
        code
          .blank()
          .push(
            `let postData = NSMutableData(data: "${source.postData.params[0].name}=${source.postData.params[0].value}".data(using: String.Encoding.utf8)!)`,
          );
        for (let i = 1, len = source.postData.params.length; i < len; i++) {
          code.push(`postData.append("&${source.postData.params[i].name}=${source.postData.params[i].value}".data(using: String.Encoding.utf8)!)`);
        }
        break;

      case 'application/json':
        if (source.postData.jsonObj) {
          code
            .push(helpers.literalDeclaration('parameters', source.postData.jsonObj, opts), 'as [String : Any]')
            .blank()
            .push('let postData = JSONSerialization.data(withJSONObject: parameters, options: [])');
        }
        break;

      case 'multipart/form-data':
        /**
         * By appending multipart parameters one by one in the resulting snippet,
         * we make it easier for the user to edit it according to his or her needs after pasting.
         * The user can just edit the parameters NSDictionary or put this part of a snippet in a multipart builder method.
         */
        code
          .push(helpers.literalDeclaration('parameters', source.postData.params, opts))
          .blank()
          .push(`let boundary = "${source.postData.boundary}"`)
          .blank()
          .push('var body = ""')
          .push('var error: NSError? = nil')
          .push('for param in parameters {')
          .push('let paramName = param["name"]!', 1)
          .push('body += "--\\(boundary)\\r\\n"', 1)
          .push('body += "Content-Disposition:form-data; name=\\"\\(paramName)\\""', 1)
          .push('if let filename = param["fileName"] {', 1)
          .push('let contentType = param["content-type"]!', 2)
          .push('let fileContent = String(contentsOfFile: filename, encoding: String.Encoding.utf8)', 2)
          .push('if (error != nil) {', 2)
          .push('print(error)', 3)
          .push('}', 2)
          .push('body += "; filename=\\"\\(filename)\\"\\r\\n"', 2)
          .push('body += "Content-Type: \\(contentType)\\r\\n\\r\\n"', 2)
          .push('body += fileContent', 2)
          .push('} else if let paramValue = param["value"] {', 1)
          .push('body += "\\r\\n\\r\\n\\(paramValue)"', 2)
          .push('}', 1)
          .push('}');
        break;

      default:
        code.blank().push(`let postData = NSData(data: "${source.postData.text}".data(using: String.Encoding.utf8)!)`);
    }
  }

  code
    .blank()
    // NSURLRequestUseProtocolCachePolicy is the default policy, let's just always set it to avoid confusion.
    .push(`let request = NSMutableURLRequest(url: NSURL(string: "${source.fullUrl}")! as URL,`)
    .push('                                        cachePolicy: .useProtocolCachePolicy,')
    .push(`                                    timeoutInterval: ${parseInt(opts.timeout, 10).toFixed(1)})`)
    .push(`request.httpMethod = "${source.method}"`);

  if (req.hasHeaders) {
    code.push('request.allHTTPHeaderFields = headers');
  }

  if (req.hasBody) {
    code.push('request.httpBody = postData as Data');
  }

  code
    .blank()
    // Retrieving the shared session will be less verbose than creating a new one.
    .push('let session = URLSession.shared')
    .push('let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in')
    .push('if (error != nil) {', 1)
    .push('print(error)', 2)
    .push('} else {', 1)
    // Casting the NSURLResponse to NSHTTPURLResponse so the user can see the status     .
    .push('let httpResponse = response as? HTTPURLResponse', 2)
    .push('print(httpResponse)', 2)
    .push('}', 1)
    .push('})')
    .blank()
    .push('dataTask.resume()');

  return code.join();
};

module.exports.info = {
  key: 'nsurlsession',
  title: 'NSURLSession',
  link: 'https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html',
  description: "Foundation's NSURLSession request",
};
