import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`, {
          uid: user.uid,
          role: user.role,
        })
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <button onClick={() => localStorage.clear() || (window.location.href = "/")}>Logout</button>
    </div>
  );
}

export default Dashboard;
