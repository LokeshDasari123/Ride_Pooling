import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin, {user ? user.name : "Guest"}!</p>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Manage Users</h2>
        {/* Placeholder for user management functionality */}
        <button onClick={() => navigate("/manage-users")}>
          Go to User Management
        </button>
      </div>
      <div>
        <h2>System Statistics</h2>
        {/* Placeholder for displaying system stats */}
      </div>
      {/* Additional admin-specific components and functionalities */}
    </div>
  );
}

export default AdminDashboard;
