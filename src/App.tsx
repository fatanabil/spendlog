import { Route, Routes } from 'react-router-dom';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<AuthenticatedLayout />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
        </Routes>
    );
}

export default App;
