curl --request POST \
  --url http://mockbin.com/har \
  --header 'content-type: application/json' \
  --data @- <<EOF
{
  "number": 1,
  "string": "f'oo"
}
EOF