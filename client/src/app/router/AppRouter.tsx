import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAuthStore } from "../../features/auth/store/authStore";
import { privateRoutes, publicRoutes } from "./router.config";
import AuthLayout from "../../shared/ui/AuthLayout";

const AppRouter = () => {
  const auth = useAuthStore((state) => state.auth);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-700">
        Загрузка...
      </div>
    );
  }

  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<AuthLayout><route.element /></AuthLayout>}
            />
          ))}
          <Route path="*" element={<Navigate to="/feed" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<route.element />} />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;