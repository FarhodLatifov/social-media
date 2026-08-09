// src/features/auth/store/authStore.ts
import { create } from "zustand";
import {type IProfile} from "../../../shared/types/profile.type"

interface AuthState {
  auth: boolean;
  isLoading: boolean;
  user: IProfile | null;
  login: (credentials: unknown) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: false,
  isLoading: true, // Изначально true, пока идет проверка сессии
  user: null,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      // Имитация запроса к API
      const mockUser: IProfile = {
        id: "1",
        username: "johndoe",
        displayName: "John Doe",
        avatarUrl: null,
        followersCount: 42,
        followingCount: 120,
      };
      set({ auth: true, user: mockUser, isLoading: false });
    } catch (e) {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ auth: false, user: null });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    // Тут будет логика проверки refreshToken/token из localStorage
    set({ isLoading: false });
  },
}));
