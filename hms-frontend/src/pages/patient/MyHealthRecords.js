import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./MyHealthRecords.css";

function MyHealthRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchHealthRecords(storedUser.uid);
    }
  }, []);

  const fetchHealthRecords = async (patientId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/patient/health-records/${patientId}`);
      setRecords(response.data.records || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching health records:", error);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2>My Health Records</h2>

      {loading ? <p>Loading...</p> : records.length === 0 ? <p>No health records found.</p> : (
        <div className="records-list">
          {records.map((record) => (
            <div key={record.id} className="record-card">
              <h4>{record.diagnosis}</h4>
              <p><strong>Doctor:</strong> {record.doctorName}</p>
              <p><strong>Prescription:</strong> {record.prescription}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
              <p><strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyHealthRecords;
