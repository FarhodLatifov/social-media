// src/features/auth/store/authStore.ts
import { create } from "zustand";
import { type IProfile } from "../../../shared/types/profile.type";

interface AuthState {
  auth: boolean;
  isLoading: boolean;
  user: IProfile | null;
  setAuth: (value: boolean) => void;
  setUser: (user: IProfile | null) => void;
  login: (user: IProfile) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AUTH_KEY = "auth";
const AUTH_USER_KEY = "auth_user";

export const useAuthStore = create<AuthState>((set) => ({
  auth: false,
  isLoading: true, // Изначально true, пока идет проверка сессии
  user: null,

  setAuth: (value) => set({ auth: value }),
  setUser: (user) => set({ user }),

  login: (user) => {
    set({ auth: true, user, isLoading: false });
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },

  logout: () => {
    set({ auth: false, user: null });
    localStorage.setItem(AUTH_KEY, "false");
    localStorage.removeItem(AUTH_USER_KEY);
  },

  checkAuth: async () => {
    set({ isLoading: true });

    const auth = localStorage.getItem(AUTH_KEY) === "true";
    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (auth && storedUser) {
      try {
        const user: IProfile = JSON.parse(storedUser);
        set({ auth: true, user, isLoading: false });
        return;
      } catch {
        localStorage.removeItem(AUTH_USER_KEY);
      }
    }

    set({ auth: false, user: null, isLoading: false });
  },
}));
