import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./ManagePatients.css";

function ManagePatients() {
  const [patients, setPatients] = useState([]);
  //nst [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openPatient, setOpenPatient] = useState(null); // Track opened patient details

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/patients`);
      setPatients(response.data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchPatientDetails = async (id) => {
    if (openPatient === id) {
      setOpenPatient(null); // Close dropdown if already open
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/patient/${id}`);
      setOpenPatient({ id, ...response.data });
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const handleDeletePatient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/delete-patient/${id}`);
      setMessage("Patient deleted successfully!");
      fetchPatients();
      setOpenPatient(null);
    } catch (error) {
      setMessage("Error deleting patient.");
    }
  };

  return (
    <DashboardLayout>
      <h2>Manage Patients</h2>

      {message && <p className="message">{message}</p>}
      
      <div className="patients-container">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <div className="patient-header" onClick={() => fetchPatientDetails(patient.id)}>
              <h4>{patient.name}</h4>
              <span>{patient.email}</span>
            </div>

            {openPatient?.id === patient.id && (
              <div className="patient-details">
                <p><strong>Phone:</strong> {openPatient.patient.phone}</p>
                <p><strong>Role:</strong> {openPatient.patient.role}</p>

                <h4>Health Records</h4>
                {openPatient.healthRecords.length > 0 ? (
                  <ul>
                    {openPatient.healthRecords.map((record) => (
                      <li key={record.id}>
                        <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                        <p><strong>Prescription:</strong> {record.prescription}</p>
                        <p><strong>Notes:</strong> {record.notes}</p>
                      </li>
                    ))}
                  </ul>
                ) : <p>No health records found.</p>}

                <button onClick={() => handleDeletePatient(patient.id)} className="delete-btn">Delete Patient</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default ManagePatients;
