import { useState } from "react";
import axios from "axios";

function Home() {
  const [OriginalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:8001/url", { url: OriginalUrl })
      .then((res) => {
        setShortUrl(res.data);
        console.log("API response: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app-container">
      <h1 className="title">URL Shortener</h1>
      <div className="form-container">
        <input
          className="url-input"
          value={OriginalUrl}
          placeholder="Enter URL to shorten"
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          type="text"
          name="OriginalUrl"
          id=""
        />
        <button className="submit-button" onClick={handleSubmit} type="submit">
          Shorten
        </button>
      </div>
      {shortUrl && (
        <div className="result-container">
          <p className="result-title">Shortened URL:</p>
          <a
            className="short-url"
            href={shortUrl?.id}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl?.id}
          </a>
          <br/>
          <img
            className="qr-code"
            src={shortUrl.qrcode}
            alt="Generated QR Code"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
