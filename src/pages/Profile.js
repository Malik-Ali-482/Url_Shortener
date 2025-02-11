import { useState, useEffect } from "react";
import "./Profile.css";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [urls, setUrls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({ username: "", email: "", password: "" });

    const urlsPerPage = 5;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return console.error("❌ No token found in localStorage");

        // Fetch User Data
        fetch("http://localhost:8001/user/details", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(userData => {
                setUser(userData);
                setEditData({ username: userData.username, email: userData.email, password: "" });

                // Fetch URLs
                return fetch("http://localhost:8001/url/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
            })
            .then(res => res.json())
            .then(urlData => setUrls(urlData))
            .catch(error => console.error("🚨 Error:", error));
    }, []);

    const totalPages = urls.length ? Math.ceil(urls.length / urlsPerPage) : 1;
    const paginatedUrls = urls.slice((currentPage - 1) * urlsPerPage, currentPage * urlsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleEditProfile = () => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8001/user/update", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editData),
        })
            .then(res => res.json())
            .then(updatedUser => {
                setUser(updatedUser);
                setShowEditModal(false);
                alert("✅ Profile updated successfully!");
            })
            .catch(error => console.error("🚨 Error updating profile:", error));
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h2>Profile</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button className="edit-btn" onClick={() => setShowEditModal(true)}>Edit Profile</button>

                    <h3>Your URLs</h3>
                    {paginatedUrls.length > 0 ? (
                        <>
                            <table className="url-table">
                                <thead>
                                    <tr>
                                        <th>Original URL</th>
                                        <th>Shortened URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUrls.map((url, index) => (
                                        <tr key={index}>
                                            <td>
                                                <a href={url.redirectUrl} target="_blank" rel="noopener noreferrer">
                                                    {url.redirectUrl}
                                                </a>
                                            </td>
                                            <td>
                                                <a href={`http://localhost:8001/${url.shortId}`} target="_blank" rel="noopener noreferrer">
                                                    http://localhost:8001/{url.shortId}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pagination">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToPage(i + 1)}
                                        className={currentPage === i + 1 ? "active" : ""}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No URLs found.</p>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}

            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Profile</h3>
                        <label>Username:</label>
                        <input type="text" value={editData.username} onChange={(e) => setEditData({ ...editData, username: e.target.value })} />
                        <label>Email:</label>
                        <input type="email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                        <label>New Password:</label>
                        <input type="password" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
                        <button onClick={handleEditProfile}>Save Changes</button>
                        <button className="close-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
