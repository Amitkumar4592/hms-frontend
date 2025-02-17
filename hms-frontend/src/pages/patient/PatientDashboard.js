import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import "./PatientDashboard.css";

function PatientDashboard() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchPatientProfile(storedUser.uid);
    }
  }, []);

  const fetchPatientProfile = async (uid) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`, {
        uid,
        role: "PATIENT",
      });
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  return (
    <DashboardLayout>
      <h2>Patient Dashboard</h2>

      {patient ? (
        <div className="patient-info">
          <h3>Welcome, {patient.name}!</h3>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <div className="patient-actions">
        <Link to="/patient/book-appointment" className="action-btn">Book an Appointment</Link>
        <Link to="/patient/appointments" className="action-btn">My Appointments</Link>
        <Link to="/patient/records" className="action-btn">My Health Records</Link>
      </div>
    </DashboardLayout>
  );
}

export default PatientDashboard;
