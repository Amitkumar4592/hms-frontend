import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Redirect if not logged in
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2>🏥 HMS</h2>
        <ul>
          {user?.role === "ADMIN" && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/manage-doctors">Manage Doctors</Link></li>
              <li><Link to="/admin/manage-patients">Manage Patients</Link></li>
              <li><Link to="/admin/manage-appointments">Manage Appointments</Link></li>
            </>
          )}
          {user?.role === "DOCTOR" && (
            <>
              <li><Link to="/doctor/dashboard">Dashboard</Link></li>
              <li><Link to="/doctor/appointments">My Appointments</Link></li>
              <li><Link to="/doctor/status">Update Availability</Link></li>
              <li><Link to="/doctor/health-records">Upload Health Records</Link></li>
            </>
          )}
          {user?.role === "PATIENT" && (
            <>
              <li><Link to="/patient/dashboard">Dashboard</Link></li>
              <li><Link to="/patient/book">Book Appointment</Link></li>
              <li><Link to="/patient/appointments">My Appointments</Link></li>
              <li><Link to="/patient/records">My Health Records</Link></li>
            </>
          )}
          <li><Link to="/" onClick={() => localStorage.clear() || navigate("/")}>Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">{children}</main>
    </div>
  );
}

export default DashboardLayout;
