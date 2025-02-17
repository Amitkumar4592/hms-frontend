import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./UploadHealthRecords.css";

function UploadHealthRecords() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchPatients(storedUser.uid);
    }
  }, []);

  const fetchPatients = async (doctorId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/doctor/appointments/${doctorId}`);
  
      // Extract unique patients from appointments
      const uniquePatients = {};
      response.data.appointments.forEach((appointment) => {
        if (!uniquePatients[appointment.patientId]) {
          uniquePatients[appointment.patientId] = appointment.patientName;
        }
      });
  
      // Convert to array format for dropdown
      const patientList = Object.keys(uniquePatients).map((id) => ({
        patientId: id,
        patientName: uniquePatients[id],
      }));
  
      console.log("Processed Patients:", patientList); // Debugging Log
  
      setPatients(patientList);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };
  

  const handleUploadRecord = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setMessage("User not logged in.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/doctor/upload-record`, {
        doctorId: storedUser.uid,
        patientId: selectedPatient,
        diagnosis,
        prescription,
        notes,
      });

      setMessage("Health record uploaded successfully!");
      setSelectedPatient("");
      setDiagnosis("");
      setPrescription("");
      setNotes("");
    } catch (error) {
      setMessage("Error uploading health record.");
    }
  };

  return (
    <DashboardLayout>
      <h2>Upload Health Records</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleUploadRecord} className="record-form">
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.patientId} value={patient.patientId}>
              {patient.patientName}
            </option>
          ))}
        </select>

        <input type="text" placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
        <textarea placeholder="Prescription" value={prescription} onChange={(e) => setPrescription(e.target.value)} required />
        <textarea placeholder="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button type="submit">Upload Record</button>
      </form>
    </DashboardLayout>
  );
}

export default UploadHealthRecords;
