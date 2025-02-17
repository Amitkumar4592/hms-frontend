import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./DoctorAppointments.css";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchAppointments(storedUser.uid);
    }
  }, []);

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/doctor/appointments/${doctorId}`);
      setAppointments(response.data.appointments || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <DashboardLayout>
      <h2>My Appointments</h2>

      <input
        type="text"
        placeholder="Filter by status (Upcoming, Completed, Cancelled)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredAppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointment-card ${appointment.status.toLowerCase()}`}
            >
              <h4>{appointment.patientName}</h4>
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

export default DoctorAppointments;
