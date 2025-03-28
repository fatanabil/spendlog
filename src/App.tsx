import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import LoadingScreen from "./components/LoadingScreen";

const Home = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/LoginPage"));
const Register = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
    </Suspense>
  );
}

export default App;
