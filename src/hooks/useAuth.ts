import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constant';

const useAuth = () => {
    const { accessToken, setAccessToken, setUser, logout } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (!accessToken) {
                    const res = await fetch(`${API_BASE_URL}/refresh-token`, { method: 'POST', credentials: 'include' });
                    const data = await res.json();

                    if (!res.ok) throw new Error(data.message);

                    setAccessToken(data.accessToken);
                    setUser(data.user);
                }
            } catch (error) {
                console.error(`Auth failed : ${error}`);
                logout();
                if (error && location.pathname !== '/login') {
                    navigate('/login', { replace: true });
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [accessToken, setAccessToken, location.pathname, logout, navigate, setUser]);

    return { loading };
};

export default useAuth;
