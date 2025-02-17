import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./ManageAppointments.css";

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchDoctorsAndPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/all-appointments`);
      console.log("Appointments Data:", response.data); // Debugging Log
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchDoctorsAndPatients = async () => {
    try {
      const patientsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/patients`);
      const doctorsResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/doctors`);

      const patientsMap = {};
      patientsResponse.data.patients.forEach((patient) => {
        patientsMap[patient.id] = patient.name;
      });

      const doctorsMap = {};
      doctorsResponse.data.doctors.forEach((doctor) => {
        doctorsMap[doctor.id] = doctor.name;
      });

      setPatients(patientsMap);
      setDoctors(doctorsMap);
    } catch (error) {
      console.error("Error fetching patients or doctors:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/admin/update-appointment/${id}`,
        { status: newStatus }
      );
  
      console.log("Update Response:", response.data); // Debugging Log
      setMessage(`Appointment marked as ${newStatus}!`);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment status:", error.response?.data || error.message);
      setMessage("Error updating appointment status.");
    }
  };
  

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = patients[appointment.patientId] ? patients[appointment.patientId].toLowerCase() : "";
    const doctorName = doctors[appointment.doctorId] ? doctors[appointment.doctorId].toLowerCase() : "";
    const status = appointment.status ? appointment.status.toLowerCase() : "";

    return (
      patientName.includes(filter.toLowerCase()) ||
      doctorName.includes(filter.toLowerCase()) ||
      status.includes(filter.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <h2>Manage Appointments</h2>
      {message && <p className="message">{message}</p>}

      <input
        type="text"
        placeholder="Search by patient, doctor, or status..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <table className="appointments-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{patients[appointment.patientId] || "Unknown"}</td>
                <td>{doctors[appointment.doctorId] || "Unknown"}</td>
                <td>{appointment.date || "N/A"}</td>
                <td>{appointment.time || "N/A"}</td>
                <td>{appointment.status || "N/A"}</td>
                <td>
                  {appointment.status !== "Completed" && (
                    <button onClick={() => handleUpdateStatus(appointment.id, "Completed")} className="complete-btn">
                      Mark as Completed
                    </button>
                  )}
                  {appointment.status !== "Cancelled" && (
                    <button onClick={() => handleUpdateStatus(appointment.id, "Cancelled")} className="cancel-btn">
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default ManageAppointments;
