import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Load token from localStorage when the app starts
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // 🔹 Function to login and store token in localStorage
    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    // 🔹 Function to logout and remove token from localStorage
    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Optional: Clear user data
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext };

export default AuthContext;