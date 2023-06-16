curl --request GET \
  --url https://httpbin.org/headers \
  --header 'accept: application/json' \
  --header 'quoted-value: "quoted" '\''string'\''' \
  --header 'x-bar: Foo' \
  --header 'x-foo: Bar'