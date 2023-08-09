use serde_json::json;

use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let payload = json!(
        {
            "number": 1,
            "string": "f\"oo",
            "arr": vec![1,2,3],
            "nested": json!({"a": "b"}),
            "arr_mix": (1, "a", json!({"arr_mix_nested": json!(null)})),
            "boolean": false
        }
    );

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("content-type", "application/json".parse().unwrap());

    let client = reqwest::Client::new();
    let response = client.post(url)
        .json(&payload)
        .headers(headers)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
