curl --request POST \
  --url https://httpbin.org/anything \
  --header 'content-type: application/json' \
  --data @- <<EOF
{
  "number": 1,
  "string": "f'oo"
}
EOF