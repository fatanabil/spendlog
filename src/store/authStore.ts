import { create } from "zustand";
import { User } from "../schemas/User";

interface AuthState {
  accessToken: string | null;
  user: User;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: { id: "", email: "", name: "" },
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  logout: () =>
    set({ accessToken: null, user: { id: "", email: "", name: "" } }),
}));
