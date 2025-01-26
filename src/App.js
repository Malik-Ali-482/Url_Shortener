import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClickHistory from "./pages/ClickHistory";
import Home from "./pages/Home.js"; // Adjust import path if needed
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link> | <Link to="/history">Click History</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<ClickHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
