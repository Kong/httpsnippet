use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("accept", "application/json".parse().unwrap());
    headers.insert("x-foo", "Bar".parse().unwrap());
    headers.insert("quoted-value", "\"quoted\" 'string'".parse().unwrap());

    let client = reqwest::Client::new();
    let response = client.get(url)
        .headers(headers)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
