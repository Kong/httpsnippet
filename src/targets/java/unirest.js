'use strict';

var util = require('util');

module.exports = function(options) {
	var opts = util._extend({
		indent : '			'
	}, options);

	var code = [];

	code.push(util.format(
			'HttpResponse<JsonNode> jsonResponse = Unirest.%s("%s")', this.source.method.toLowerCase(),
			this.source.fullUrl));
	
	// construct headers
	if (this.source.headers && this.source.headers.length) {
		this.source.headers.map(function(header) {
			code.push(util.format('.header("%s", "%s")', header.name,
					header.value));
		});
	}
	

	//construct cookies argument
	if (this.source.cookies && this.source.cookies.length) {
		var cookies = this.source.cookies.map(function(cookie) {
			return encodeURIComponent(cookie.name) + '='
					+ encodeURIComponent(cookie.value);
		});
		code.push(util.format('.header("Cookie", "%s")', cookies.join('; ')));
	}

	//construct postdata
	if (this.source.postData) {
		if(this.source.postData.text){
			code.push(util.format('.body(%s)', JSON
					.stringify(this.source.postData.text)));
		}
	}

	code.push(".asJson();");
	return code.join( '\n' + opts.indent);
};



module.exports.info = {
	  key: 'unirest',
	  title: 'JAVA',
	  link : 'http://unirest.io/java.html',
	  description : 'Unirest Java interface'
};
