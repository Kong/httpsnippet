import axios from 'axios';

const form = new FormData();
form.append('foo', 'bar');

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
  data: '[form]'
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}