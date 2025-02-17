import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";
import "./BookAppointment.css";

function BookAppointment() {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (specialization) {
      fetchDoctors();
    }
  }, [specialization]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/patient/available-doctors?specialization=${specialization}`
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      setMessage("User not logged in.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/patient/book-appointment`, {
        patientId: storedUser.uid,
        doctorId: selectedDoctor,
        date,
        time,
      });

      setMessage("Appointment booked successfully!");
      setSpecialization("");
      setSelectedDoctor("");
      setDate("");
      setTime("");
    } catch (error) {
      setMessage("Error booking appointment.");
    }
  };

  return (
    <DashboardLayout>
      <h2>Book an Appointment</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleBookAppointment} className="appointment-form">
        <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} required>
          <option value="">Select Specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>

        <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} ({doctor.specialization})
            </option>
          ))}
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

        <button type="submit">Book Appointment</button>
      </form>
    </DashboardLayout>
  );
}

export default BookAppointment;
    