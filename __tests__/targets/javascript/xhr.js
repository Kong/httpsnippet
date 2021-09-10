module.exports = function (HTTPSnippet, fixtures) {
  test('should not use cors', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('javascript', 'xhr', {
      cors: false,
    });

    expect(result.replace(/\n/g, '')).toBe(
      'const data = null;const xhr = new XMLHttpRequest();xhr.addEventListener("readystatechange", function () {  if (this.readyState === this.DONE) {    console.log(this.responseText);  }});xhr.open("GET", "https://httpbin.org/anything");xhr.send(data);'
    );
  });
};
