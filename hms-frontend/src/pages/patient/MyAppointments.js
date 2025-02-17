import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./MyAppointments.css";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchAppointments(storedUser.uid);
    }
  }, []);

  const fetchAppointments = async (patientId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/patient/appointments/${patientId}`);
      setAppointments(response.data.appointments || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2>My Appointments</h2>

      {loading ? <p>Loading...</p> : appointments.length === 0 ? <p>No appointments found.</p> : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className={`appointment-card ${appointment.status === "Completed" ? "completed" : "upcoming"}`}>
              <h4>{appointment.doctorName}</h4>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyAppointments;
