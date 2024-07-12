use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "https://mockbin.com/har";

    let client = reqwest::Client::new();
    let response = client.get(url)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
