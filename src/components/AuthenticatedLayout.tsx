import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AuthenticatedLayoutProps {
  children: ReactNode | string;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { loading } = useAuth();

  if (loading) {
    return <div>LOADING ....</div>;
  }

  return (
    <div className="flex max-h-screen overflow-y-clip">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col">
        <Topbar />
        <main className="bg-tradewind-50 flex w-[calc(100vw-250px)] flex-1 overflow-y-auto px-6 pt-6 lg:w-[calc(100vw-300px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
