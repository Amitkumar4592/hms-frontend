import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./UpdateAvailability.css";

function UpdateAvailability() {
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      fetchDoctorAvailability(storedUser.uid);
    }
  }, []);

  const fetchDoctorAvailability = async (doctorId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/doctor/profile/${doctorId}`);
      setAvailable(response.data.available);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    }
  };

  const handleUpdateAvailability = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.uid) {
      setMessage("User not logged in.");
      return;
    }
  
    try {
      console.log(`Updating availability for Doctor ID: ${storedUser.uid}`);
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/doctor/status/${storedUser.uid}`,
        { available: !available }
      );
  
      console.log("API Response:", response.data);
      setAvailable(!available);
      setMessage("Availability updated successfully!");
    } catch (error) {
      console.error("Error updating availability:", error.response?.data || error);
      setMessage("Error updating availability. Check console for details.");
    }
  };
  
  

  return (
    <DashboardLayout>
      <h2>Update Availability</h2>
      {message && <p className="message">{message}</p>}

      <div className="availability-container">
        <p><strong>Status:</strong> {available ? "Available" : "Unavailable"}</p>
        <button onClick={handleUpdateAvailability} className={available ? "unavailable-btn" : "available-btn"}>
          {available ? "Set as Unavailable" : "Set as Available"}
        </button>
      </div>
    </DashboardLayout>
  );
}

export default UpdateAvailability;
