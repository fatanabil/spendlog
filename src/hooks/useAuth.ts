import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { api } from "../utils/api";

const useAuth = () => {
  const { accessToken, setAccessToken, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!accessToken) {
          const res = await api.post("/refresh-token");
          const { data } = await res.data;

          setAccessToken(data.accessToken);
          setUser(data.user);
        }
      } catch (error) {
        console.error(`Auth failed : ${error}`);
        logout();
        if (error && location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [
    accessToken,
    setAccessToken,
    location.pathname,
    logout,
    navigate,
    setUser,
  ]);

  return { loading };
};

export default useAuth;
