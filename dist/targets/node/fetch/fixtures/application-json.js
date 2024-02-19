"use strict";
var fetch = require('node-fetch');
var url = 'http://mockbin.com/har';
var options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{"number":1,"string":"f\"oo","arr":[1,2,3],"nested":{"a":"b"},"arr_mix":[1,"a",{"arr_mix_nested":{}}],"boolean":false}'
};
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
