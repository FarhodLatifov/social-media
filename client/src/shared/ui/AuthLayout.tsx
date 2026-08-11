import { useNavigate } from "react-router";
import { useAuthStore } from "../../features/auth/store/authStore";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-lg font-semibold text-slate-900">Social Media</div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Выйти
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4">{children}</main>
    </div>
  );
};

export default AuthLayout;
