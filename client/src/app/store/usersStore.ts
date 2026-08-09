import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";

interface IUser {
  username: string;
  password: string;
}

interface IUsersStore {
  users: IUser[];
  addUser: (username: string, password: string) => void;
  checkUser: (username: string) => void;
}

export const useUsersStore = create<IUsersStore>()(
  persist(
    // Добавляем аргумент `get` в параметры стора
    (set, get) => ({
      users: [{ username: "farhod", password: "admin" }],
      
      addUser: (username, password) => {
        const newUser = { username, password };
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },
      
      // ИСПРАВЛЕНО: убираем set, используем get() для чтения данных
      checkUser: (username) => {
        const { users } = get(); // Безопасно получаем актуальный список пользователей
        const userExists: boolean = users.some((user) => user.username === username);
        
        // Вызываем экшен другого стора напрямую
        useAuthStore.getState().setAuth(userExists);

        localStorage.setItem("auth", String(userExists));
      },
    }),
    {
      name: "users",
    },
  ),
);
