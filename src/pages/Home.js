import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Make sure your CSS reflects these changes
import { FaRegCheckCircle, FaChartLine, FaQrcode, FaUsers, FaGlobe } from "react-icons/fa"; // Import icons from react-icons
import { MdCalendarMonth, MdOutlineContactPhone } from "react-icons/md";

function Page() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [enableQrCode, setEnableQrCode] = useState(false);
  const [activeQA, setActiveQA] = useState(null); // Track the active Q/A item

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/url", {
        url: originalUrl,
        generateQr: enableQrCode,
      })
      .then((res) => {
        setShortUrl(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const toggleQA = (index) => {
    setActiveQA(activeQA === index ? null : index);
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Shorten, Track, and Engage with Ease</h1>
          <p>
            Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the Bitly Connections Platform.
          </p>
          <div className="url-shortener">
            <input
              type="text"
              placeholder="Enter URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="url-input"
            />
            <div className="qr-code-checkbox">
              <input
                type="checkbox"
                id="enable-qr"
                checked={enableQrCode}
                onChange={(e) => setEnableQrCode(e.target.checked)}
              />
              <label htmlFor="enable-qr">Enable QR Code Display</label>
            </div>
            <button onClick={handleSubmit} className="cta-button">
              Shorten
            </button>
          </div>
          {shortUrl && (
            <div className="short-url-result">
              <p>Shortened URL:</p>
              <a href={shortUrl.id} target="_blank" rel="noopener noreferrer">
                {shortUrl.id}
              </a>
              <br />
              {enableQrCode && shortUrl.qrcode && (
                <img
                  src={shortUrl.qrcode}
                  alt="QR Code"
                  className="qr-image"
                />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages">
        <h2>Why Choose Us?</h2>
        <div className="advantage-cards">
          <div className="card">
            <FaRegCheckCircle size={40} />
            <h3>Easy to Use</h3>
            <p>Shorten URLs quickly and efficiently with our intuitive interface.</p>
          </div>
          <div className="card">
            <FaChartLine size={40} />
            <h3>Track Performance</h3>
            <p>Monitor clicks, traffic sources, and engagement in real-time.</p>
          </div>
          <div className="card">
            <FaQrcode size={40} />
            <h3>Customizable QR Codes</h3>
            <p>Create branded QR codes to drive engagement and connections.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <FaGlobe size={40} />
            <h3>10k+</h3>
            <p>Monthly Links Shortened</p>
          </div>
          <div className="stat-item">
            <FaChartLine size={40} />
            <h3>500k+</h3>
            <p>Monthly Clicks Tracked</p>
          </div>
          <div className="stat-item">
            <FaUsers size={40} />
            <h3>500k+</h3>
            <p>Satisfied Customers</p>
          </div>
          <div className="stat-item">
            <MdCalendarMonth size={40} />
            <h3>50M+</h3>
            <p>Total Links Created</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="qa">
        <h2>Frequently Asked Questions</h2>
        {[
          {
            question: "What is a URL shortener?",
            answer: "A URL shortener is a tool that simplifies long web addresses into shorter, more manageable links. They work by converting the original URL into a unique code, which is then used to access the website. For instance, a long URL like https://[website address].com/a-very-long-and-complex-page-title/ might be shortened to bit.ly/shortlink."
          },
          {
            question: "How do I track clicks?",
            answer: "URL shortening services provide analytics dashboards that allow you to track clicks on your shortened links. This data can include the total number of clicks, links opened during specific hours, and links opened each day."
          },
          {
            question: "Can I use a domain I already own?",
            answer: "No, currently you cannot connect your custom domain for branding, but we are working to include this functionality."
          },
          {
            question: "How do I shorten a URL for free?",
            answer: "To shorten a URL for free, simply paste the long URL into the designated field on the URL shortener's website and click the 'Shorten' button."
          },
          {
            question: "What are the benefits of a short URL?",
            answer: (
              <ul>
                <li><strong>Easier to share:</strong> Short URLs are more likely to be shared on social media and other platforms that have character limits.</li>
                <li><strong>Easier to remember:</strong> Short URLs are easier to remember than long URLs.</li>
                <li><strong>Easier to track:</strong> Most URL shortening services provide analytics dashboards to track clicks on shortened links.</li>
                <li><strong>More professional:</strong> Using a custom domain with shortened URLs enhances your brand's professional appearance.</li>
              </ul>
            )
          },
          {
            question: "How can I use URL shorteners for marketing?",
            answer: (
              <ul>
                <li><strong>Social Media:</strong> Share links easily within character limits.</li>
                <li><strong>Email Marketing:</strong> Track click-through rates on email campaigns.</li>
                <li><strong>QR Codes:</strong> Create short, memorable links for offline marketing.</li>
                <li><strong>Campaign Tracking:</strong> Monitor the performance of specific marketing campaigns.</li>
                <li><strong>Brand Building:</strong> Use custom domains for shortened links to increase brand visibility.</li>
              </ul>
            )
          },
          {
            question: "Have more questions?",
            answer: <Link to="/contact-us"><MdOutlineContactPhone style={{ marginRight: '0.5rem', fontSize: "2rem" }} /> Contact us</Link>
          }
        ].map((item, index) => (
          <div key={index} className="qa-item">
            <h3 onClick={() => toggleQA(index)}>
              {item.question}
            </h3>
            {activeQA === index && <div className="answer">{item.answer}</div>}
          </div>
        ))}
      </section>
    </div>
  );
}

export default Page;
