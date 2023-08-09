use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let payload = "{\n  \"foo\": \"bar\"\n}";

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("content-type", "application/json".parse().unwrap());

    let client = reqwest::Client::new();
    let response = client.post(url)
        .body(payload)
        .headers(headers)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
