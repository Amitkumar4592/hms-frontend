import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import ManageDoctors from "./pages/admin/ManageDoctors";
import ManagePatients from "./pages/admin/ManagePatients";
import ManageAppointments from "./pages/admin/ManageAppointments";
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import MyHealthRecords from "./pages/patient/MyHealthRecords";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import UpdateAvailability from "./pages/doctor/UpdateAvailability";
import UploadHealthRecords from "./pages/doctor/UploadHealthRecords";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-doctors" element={<ManageDoctors />} />
        <Route path="/admin/manage-patients" element={<ManagePatients />} />
        <Route path="/admin/manage-appointments" element={<ManageAppointments />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<MyAppointments />} />
        <Route path="/patient/book-appointment" element={<BookAppointment />} />
        <Route path="/patient/records" element={<MyHealthRecords />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/status" element={<UpdateAvailability />} />
        <Route path="/doctor/health-records" element={<UploadHealthRecords />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
