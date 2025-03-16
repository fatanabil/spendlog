import { ReactNode, useEffect } from "react";
import { useThemeStore } from "../store/themeStore";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
