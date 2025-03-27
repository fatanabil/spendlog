import { useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { capitalizeEachWord } from "../utils/capitalizeEachWord";
import Input from "./Input";
import { useAuthStore } from "../store/authStore";
import IconButton from "./IconButton";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface TopbarProps {
  setIsOpenSidebar: (value: boolean) => void;
}

const Topbar = ({ setIsOpenSidebar }: TopbarProps) => {
  const location = useLocation();
  const currentPage = capitalizeEachWord(location.pathname.replace("/", ""));

  const { user } = useAuthStore();
  const firstWordUser = user.name.split(" ")[0];

  return (
    <nav className="z-20 flex h-16 items-center justify-between px-4 py-3 shadow-md lg:px-6">
      <IconButton
        icon={<Bars3Icon />}
        onClick={() => setIsOpenSidebar(true)}
        className="lg:hidden"
      />
      <h1 className="text-chathams-blue text-3xl font-semibold">
        {currentPage}
      </h1>
      <div className="flex h-full items-center">
        <Input
          className="hidden bg-slate-200 px-3 py-2 text-sm text-black ring-0 placeholder:text-sm focus:ring-0 lg:block"
          placeholder="Cari transaksi"
        />
        <ThemeSwitcher className="hidden scale-75 lg:block" />
        <div className="mx-3 hidden h-full w-0.5 bg-slate-200 lg:block"></div>
        <button className="hover:bg-woodsmoke-100 flex cursor-pointer items-center gap-3 rounded-md transition-all duration-150 lg:px-3 lg:py-2">
          <p className="text-chathams-blue hidden md:block">{firstWordUser}</p>
          <img
            src=""
            alt=""
            className="min-h-8 min-w-8 rounded-full bg-slate-400"
          />
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
