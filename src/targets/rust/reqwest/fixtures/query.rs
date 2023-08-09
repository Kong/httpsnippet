use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let querystring = [("foo", "bar"), ("foo", "baz"), ("baz", "abc"), ("key", "value")];

    let client = reqwest::Client::new();
    let response = client.get(url)
        .query(&querystring)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
