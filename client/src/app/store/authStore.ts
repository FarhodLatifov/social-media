import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  auth: boolean;
  setAuth: (auth: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      auth: false,
      setAuth: (auth) => set({ auth: auth }),
    }),
    {
      name: "auth",
    },
  ),
);
