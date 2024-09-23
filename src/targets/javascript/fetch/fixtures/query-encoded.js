const options = {method: 'GET'};

fetch('https://httpbin.org/anything?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));