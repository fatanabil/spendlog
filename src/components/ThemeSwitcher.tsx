import { useEffect } from "react";
import { useThemeStore } from "../store/themeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import cn from "../utils/cn";

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "bg-woodsmoke-100 dark:bg-woodsmoke-800 relative w-15 rounded-full p-1.5 transition-all duration-300",
        className,
      )}
    >
      <div
        className={clsx(
          "relative w-fit transition-all duration-300",
          theme === "light" ? "left-0" : "left-full -translate-x-full",
        )}
      >
        <SunIcon
          className={clsx(
            "stroke-dark-cerulean relative h-5 w-5 transition-all duration-300",
            theme === "light" ? "rotate-0 opacity-100" : "rotate-90 opacity-0",
          )}
        />
        <MoonIcon
          className={clsx(
            "stroke-dark-cerulean absolute top-0 left-0 h-5 w-5 transition-all duration-300 dark:stroke-white",
            theme === "light" ? "-rotate-90 opacity-0" : "rotate-0 opacity-100",
          )}
        />
      </div>
    </button>
  );
};

export default ThemeSwitcher;
