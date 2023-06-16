wget --quiet \
  --method GET \
  --header 'accept: application/json' \
  --header 'x-foo: Bar' \
  --header 'x-bar: Foo' \
  --header 'quoted-value: "quoted" '\''string'\''' \
  --output-document \
  - https://httpbin.org/headers