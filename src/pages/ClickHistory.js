import React, { useState } from "react";
import axios from "axios";

const ClickHistory = () => {
  const [shortId, setShortId] = useState("");
  const [clickHistory, setClickHistory] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchHistory = () => {
    if (!shortId.trim()) {
      setError("Please enter a valid Short ID.");
      setClickHistory(null);
      return;
    }

    axios
      .get(`http://localhost:8001/url/analytics/${shortId}`)
      .then((res) => {
        setClickHistory(res.data);
        setError(null); // Clear any previous error
      })
      .catch((err) => {
        console.error("Error fetching click history:", err);
        setError("Failed to fetch click history. Please try again.");
        setClickHistory(null);
      });
  };

  return (
    <div className="history-container">
      <h1>Click History</h1>
      <input
        type="text"
        placeholder="Enter Short ID"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
      />
      <button onClick={handleFetchHistory}>View History</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {clickHistory && (
        <div className="history-details">
          <h2>Total Clicks: {clickHistory.totalClicks}</h2>
          <h3>Visit History:</h3>
          <ul>
            {clickHistory.analytics.map((visit, index) => (
              <li key={index}>
                <strong>Timestamp:</strong> {visit.timestamp ? new Date(visit.timestamp).toLocaleString() : "No Timestamp Available"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClickHistory;
