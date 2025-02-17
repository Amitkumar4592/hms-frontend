import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchDoctorProfile(storedUser.uid);
    }
  }, []);

  const fetchDoctorProfile = async (uid) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`, {
        uid,
        role: "DOCTOR",
      });
      setDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  return (
    <DashboardLayout>
      <h2>Doctor Dashboard</h2>

      {doctor ? (
        <div className="doctor-info">
          <h3>Welcome, Dr. {doctor.name}!</h3>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <div className="doctor-actions">
        <Link to="/doctor/appointments" className="action-btn">View Appointments</Link>
        <Link to="/doctor/status" className="action-btn">Update Availability</Link>
        <Link to="/doctor/health-records" className="action-btn">Upload Health Records</Link>
      </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;
