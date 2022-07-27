wget --quiet \
  --method GET \
  --header 'accept: application/json' \
  --header 'x-foo: Bar' \
  --header 'quoted-value: "quoted" '\''string'\''' \
  --output-document \
  - http://mockbin.com/har