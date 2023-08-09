use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://mockbin.com/har";

    let file = tokio::fs::File::open("./test/test-file.txt").await.unwrap();
    let stream = tokio_util::codec::FramedRead::new(file, tokio_util::codec::BytesCodec::new());
    let body = reqwest::Body::wrap_stream(stream);

    let f = reqwest::multipart::Part::stream(body)
        .file_name("test-file.txt")
        .mime_str("text/plain").unwrap();

    let form = reqwest::multipart::Form::new()
        .part("file", f);

    let client = reqwest::Client::new();
    let response = client.post(url)
        .multipart(form)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}
