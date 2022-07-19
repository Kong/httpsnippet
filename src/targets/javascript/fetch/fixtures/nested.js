const url = 'http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value';
const options = {method: 'GET'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}