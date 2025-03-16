import { create } from "zustand";

interface ThemeState {
  theme: string | "dark" | "light";
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("theme") ?? "dark",
  setTheme: (theme) => set({ theme }),
}));
