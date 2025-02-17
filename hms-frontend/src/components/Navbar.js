import { Link } from "react-router-dom";
import "./Navbar.css"; // Style the navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🏥 HMS</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/help">Help</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
