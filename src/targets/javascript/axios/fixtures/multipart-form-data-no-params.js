import axios from 'axios';

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'Content-Type': 'multipart/form-data'}
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}