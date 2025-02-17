import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./ManageDoctors.css";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", email: "", password: "", specialization: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openDoctor, setOpenDoctor] = useState(null); // Track open doctor details

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/doctors`);
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/add-doctor`, newDoctor);
      setMessage("Doctor added successfully!");
      fetchDoctors();
      setNewDoctor({ name: "", email: "", password: "", specialization: "", phone: "" });
    } catch (error) {
      setMessage("Error adding doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/admin/delete-doctor/${id}`);
      setMessage("Doctor deleted successfully!");
      fetchDoctors();
    } catch (error) {
      setMessage("Error deleting doctor.");
    }
  };

  return (
    <DashboardLayout>
      <h2>Manage Doctors</h2>

      <h3>Add a New Doctor</h3>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleAddDoctor} className="doctor-form">
        <input type="text" placeholder="Name" required value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} />
        <input type="email" placeholder="Email" required value={newDoctor.email} onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })} />
        <input type="password" placeholder="Password" required value={newDoctor.password} onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })} />
        <input type="text" placeholder="Specialization" required value={newDoctor.specialization} onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })} />
        <input type="text" placeholder="Phone" required value={newDoctor.phone} onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })} />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Doctor"}</button>
      </form>

      <h3>All Doctors</h3>
      <div className="doctors-container">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-header" onClick={() => setOpenDoctor(openDoctor === doctor.id ? null : doctor.id)}>
              <h4>{doctor.name}</h4>
              <span>{doctor.specialization}</span>
            </div>
            {openDoctor === doctor.id && (
              <div className="doctor-details">
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Phone:</strong> {doctor.phone}</p>
                <p><strong>Available:</strong> {doctor.available ? "Yes" : "No"}</p>
                <button onClick={() => handleDeleteDoctor(doctor.id)} className="delete-btn">Delete Doctor</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default ManageDoctors;
