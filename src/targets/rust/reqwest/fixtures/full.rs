use serde_json::json;
use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let querystring = [
        ("foo", "bar,baz"),
        ("baz", "abc"),
        ("key", "value"),
    ];

    let payload = json!({"foo": "bar"});

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("cookie", "foo=bar; bar=baz".parse().unwrap());
    headers.insert("accept", "application/json".parse().unwrap());
    headers.insert("content-type", "application/x-www-form-urlencoded".parse().unwrap());

    let client = reqwest::Client::new();
    let response = client.post(url)
        .query(&querystring)
        .headers(headers)
        .form(&payload)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
