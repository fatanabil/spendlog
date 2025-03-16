import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthenticatedLayout = () => {
    const { loading } = useAuth();

    if (loading) {
        return <div>LOADING ....</div>;
    }

    return (
        <div>
            <h1>INI DASHBOARD</h1>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default AuthenticatedLayout;
