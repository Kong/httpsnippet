use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    async fn file_to_part(file_name: &'static str) -> reqwest::multipart::Part {
        let file = tokio::fs::File::open(file_name).await.unwrap();
        let stream = tokio_util::codec::FramedRead::new(file, tokio_util::codec::BytesCodec::new());
        let body = reqwest::Body::wrap_stream(stream);
        reqwest::multipart::Part::stream(body)
            .file_name(file_name)
            .mime_str("text/plain").unwrap()
    }

    let form = reqwest::multipart::Form::new()
        .part("foo", file_to_part("hello.txt").await)
        .text("bar", "Bonjour le monde");
    let mut headers = reqwest::header::HeaderMap::new();

    let client = reqwest::Client::new();
    let response = client.post(url)
        .multipart(form)
        .headers(headers)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
