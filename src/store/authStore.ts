import { create } from 'zustand';

interface AuthState {
    accessToken: string | null;
    user: unknown;
    setAccessToken: (token: string) => void;
    setUser: (user: unknown) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    user: null,
    setAccessToken: (token) => set({ accessToken: token }),
    setUser: (user) => set({ user }),
    loading: false,
    setLoading: (loading) => set({ loading }),
    logout: () => set({ accessToken: null, user: null }),
}));
