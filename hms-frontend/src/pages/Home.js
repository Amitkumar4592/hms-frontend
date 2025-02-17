import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <section className="hero">
        <h1>Welcome to the Hospital Management System</h1>
        <p>Efficiently manage doctors, patients, and appointments.</p>
        <a href="/register" className="btn">Get Started</a>
      </section>
    </div>
  );
}

export default Home;
  