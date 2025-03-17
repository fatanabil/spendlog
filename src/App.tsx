import { Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <AuthenticatedLayout>
            <Dashboard />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/transaksi"
        element={<AuthenticatedLayout>Transaksi</AuthenticatedLayout>}
      />
      <Route
        path="/laporan"
        element={<AuthenticatedLayout>Laporan</AuthenticatedLayout>}
      />
      <Route
        path="/kategori"
        element={<AuthenticatedLayout>Kategori</AuthenticatedLayout>}
      />
      <Route
        path="/budget"
        element={<AuthenticatedLayout>Budget</AuthenticatedLayout>}
      />
      <Route
        path="/profil"
        element={<AuthenticatedLayout>Profil</AuthenticatedLayout>}
      />
    </Routes>
  );
}

export default App;
