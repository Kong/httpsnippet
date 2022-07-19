const url = 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value';
const options = {method: 'GET'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}