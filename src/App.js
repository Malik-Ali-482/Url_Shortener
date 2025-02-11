import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthContext, { AuthProvider } from "./Utils/authContext"; // Correct import
import "./App.css";

function App() {
    const { token, login, logout } = useContext(AuthContext); // Using new AuthContext

    // 🔹 Token verification on app load
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) return; // No need to verify if there's no token

            try {
                const response = await fetch("http://localhost:8001/user/verify", {
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Correct Authorization format
                });
                const data = await response.json();

                if (!data.isValid) {
                    console.warn("Invalid token, logging out...");
                    logout(); // ✅ Use logout instead of setting a boolean
                }
            } catch (error) {
                console.error("Token verification failed:", error);
                logout(); // ✅ Logout on failure
            }
        };

        verifyToken();
    }, [token, logout]); // ✅ Depend on `token` and `logout`

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

// ✅ Wrap the App component with AuthProvider
export default function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
