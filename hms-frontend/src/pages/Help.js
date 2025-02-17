import Navbar from "../components/Navbar";
import "./Help.css";

function Help() {
  return (
    <div>
      <Navbar />
      <div className="help-container">
        <h2>Help & Support</h2>
        <p>Find answers to common questions below.</p>

        <div className="faq">
          <h3>📌 How do I register as a patient?</h3>
          <p>Click on the "Register" button on the login page and fill in your details.</p>
          
          <h3>📌 Can I register as a doctor?</h3>
          <p>No, only the admin can add doctors.</p>

          <h3>📌 How do I book an appointment?</h3>
          <p>After logging in, go to the "Book Appointment" section and choose a doctor.</p>

          <h3>📌 How can I contact support?</h3>
          <p>Visit our <a href="/contact">Contact Us</a> page for help.</p>
        </div>
      </div>
    </div>
  );
}

export default Help;
