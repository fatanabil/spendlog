import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  useAuth();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  if (accessToken) {
    navigate("/dashboard", { replace: true });
  }

  return (
    <main>
      <h1>THIS IS HOMEPAGE</h1>
      <Link to="/dashboard">GO TO DASHBOARD</Link>
    </main>
  );
};

export default HomePage;
