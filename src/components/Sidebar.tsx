import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  QueueListIcon,
  Squares2X2Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import cn from "../utils/cn";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

interface SidebarProps {
  setIsOpenSidebar: (value: boolean) => void;
  isOpenSidebar: boolean;
}

const Sidebar = ({ isOpenSidebar, setIsOpenSidebar }: SidebarProps) => {
  const sidebarRef = useRef(null);

  useOutsideClick(sidebarRef, () => setIsOpenSidebar(false));

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "bg-tradewind dark:bg-tradewind-800 fixed z-50 flex max-h-screen min-h-screen w-full max-w-[300px] min-w-[250px] flex-col shadow-lg transition-all duration-300 lg:static lg:translate-x-0",
        isOpenSidebar ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-bold text-white">SpendLog</h1>
      </div>
      <hr className="bg-tradewind-600 dark:bg-tradewind-700 mx-auto h-0.5 w-[calc(100%_-_48px)] border-none outline-none" />
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <ul className="divide-tradewind-400 dark:divide-tradewind-700 flex flex-col divide-y-2">
          <li>
            <Link
              to="/dashboard"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-white transition-all duration-150"
              onClick={() => setIsOpenSidebar(false)}
            >
              <Squares2X2Icon className="size-6" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/transaksi"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-white transition-all duration-150"
              onClick={() => setIsOpenSidebar(false)}
            >
              <QueueListIcon className="h-6 w-6" />
              <span>Transaksi</span>
            </Link>
          </li>
          <li>
            <Link
              to="/laporan"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-white transition-all duration-150"
              onClick={() => setIsOpenSidebar(false)}
            >
              <DocumentChartBarIcon className="size-6" />
              <span>Laporan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/kategori"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-white transition-all duration-150"
              onClick={() => setIsOpenSidebar(false)}
            >
              <TagIcon className="size-6" />
              <span>Kategori</span>
            </Link>
          </li>
          <li>
            <Link
              to="/budget"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-white transition-all duration-150"
              onClick={() => setIsOpenSidebar(false)}
            >
              <CurrencyDollarIcon className="size-6" />
              <span>Budget</span>
            </Link>
          </li>
        </ul>
        <ul className="divide-tradewind-400 dark:divide-tradewind-700 flex flex-col divide-y-2">
          <li>
            <Link
              to="/dashboard"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-white transition-all duration-150"
              onClick={() => setIsOpenSidebar(false)}
            >
              <Cog6ToothIcon className="h-6 w-6" />
              <span>Setting</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="hover:bg-tradewind-400 dark:hover:bg-tradewind-700 flex w-full items-center gap-3 px-6 py-3 text-lg font-semibold text-rose-400"
            >
              <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
