import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <h2 className="logo">🏥 HMS Admin</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/manage-doctors">Manage Doctors</Link></li>
          <li><Link to="/admin/manage-patients">Manage Patients</Link></li>
          <li><Link to="/admin/manage-appointments">Manage Appointments</Link></li>
        </ul>
        <button className="logout-btn" onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}>Logout</button>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "❮" : "❯"}
        </button>
        <h1>Welcome, Admin</h1>
        <p>Use the sidebar to manage the hospital system.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
