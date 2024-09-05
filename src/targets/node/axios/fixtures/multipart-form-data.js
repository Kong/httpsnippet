import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
  data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="foo"\r\n\r\nbar\r\n-----011000010111000001101001--'
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));