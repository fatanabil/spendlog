import { ReactNode, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useCategoryStore } from "../store/categoryStore";
import { fetchWithToken } from "../utils/fetchWithToken";
import { ApiResponse } from "../schemas/ApiResponseSchema";
import { Category } from "../schemas/CategorySchema";

interface AuthenticatedLayoutProps {
  children: ReactNode | string;
}

const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { loading } = useAuth();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { setCategories } = useCategoryStore();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await fetchWithToken<
        ApiResponse<{ categories: Category[] }>
      >({ url: "/category" });
      if (data) {
        setCategories(data.categories);
      }
    };

    getCategories();
  }, [setCategories]);

  if (loading) {
    return <div>LOADING ....</div>;
  }

  return (
    <div className="flex max-h-screen overflow-y-clip">
      <Sidebar
        isOpenSidebar={isOpenSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
      <div className="flex w-full flex-1 flex-col">
        <Topbar setIsOpenSidebar={setIsOpenSidebar} />
        <main className="bg-tradewind-50 @container flex flex-1 flex-col overflow-y-auto px-4 pt-4 pb-6 lg:w-[calc(100vw-250px)] lg:px-6 lg:pt-6 xl:w-[calc(100vw-300px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
