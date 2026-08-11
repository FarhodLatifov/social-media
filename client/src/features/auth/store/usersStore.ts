import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";
import { type IProfile } from "../../../shared/types/profile.type";

interface IUser {
  username: string;
  password: string;
}

interface IUsersStore {
  users: IUser[];
  addUser: (username: string, password: string) => void;
  loginUser: (username: string, password: string) => boolean;
  registerUser: (username: string, password: string) => boolean;
}

const createProfile = (username: string): IProfile => ({
  id: username,
  username,
  displayName: username,
  avatarUrl: null,
  followersCount: 0,
  followingCount: 0,
});

export const useUsersStore = create<IUsersStore>()(
  persist(
    (set, get) => ({
      users: [{ username: "farhod", password: "admin" }],

      addUser: (username, password) => {
        const newUser = { username, password };
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },

      loginUser: (username, password) => {
        const { users } = get();
        const user = users.find(
          (user) => user.username === username && user.password === password,
        );
        const success = Boolean(user);

        if (success) {
          useAuthStore.getState().login(createProfile(username));
        } else {
          useAuthStore.getState().setAuth(false);
        }

        return success;
      },

      registerUser: (username, password) => {
        const { users } = get();
        const exists = users.some((user) => user.username === username);

        if (exists) {
          return false;
        }

        set((state) => ({
          users: [...state.users, { username, password }],
        }));

        useAuthStore.getState().login(createProfile(username));
        return true;
      },
    }),
    {
      name: "users",
    },
  ),
);
