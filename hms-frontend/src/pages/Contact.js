import Navbar from "../components/Navbar";
import "./Contact.css";

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Need help? Fill out the form below, and we'll get back to you.</p>

        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
