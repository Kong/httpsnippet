use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let payload = "Hello World";

    let client = reqwest::Client::new();
    let response = client.post(url)
        .body(payload)
        .header("content-type", "text/plain")
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
