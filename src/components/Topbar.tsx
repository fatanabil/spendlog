import { useLocation } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { capitalizeEachWord } from "../utils/capitalizeEachWord";
import Input from "./Input";
import { useAuthStore } from "../store/authStore";

const Topbar = () => {
  const location = useLocation();
  const currentPage = capitalizeEachWord(location.pathname.replace("/", ""));

  const { user } = useAuthStore();
  const firstWordUser = user.name.split(" ")[0];

  return (
    <nav className="z-20 flex h-16 items-center justify-between px-6 py-3 shadow-md">
      <h1 className="text-chathams-blue text-3xl font-semibold">
        {currentPage}
      </h1>
      <div className="flex h-full items-center">
        <Input
          className="bg-slate-200 px-3 py-2 text-sm text-black ring-0 placeholder:text-sm focus:ring-0"
          placeholder="Cari transaksi"
        />
        <ThemeSwitcher className="scale-75" />
        <div className="mx-3 h-full w-0.5 bg-slate-200"></div>
        <button className="hover:bg-woodsmoke-100 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all duration-150">
          <p className="text-chathams-blue">{firstWordUser}</p>
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
