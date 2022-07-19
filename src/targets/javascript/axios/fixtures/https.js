import axios from 'axios';

const options = {method: 'GET', url: 'https://mockbin.com/har'};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}