import { Routes, Route, Navigate } from "react-router"
import { useAuthStore } from "../store/authStore"
import { privateRoutes, publicRoutes } from "./router"

const AppRouter = () => {
    const auth = useAuthStore(state => state.auth)

    return (
        <Routes>
            {auth ? (
                // Если авторизован, рендерим приватные маршруты
                <>
                    {privateRoutes.map(route => (
                        <Route 
                            key={route.path} 
                            path={route.path} 
                            element={<route.element />} 
                        />
                    ))}
                    {/* Если попал на несуществующий путь или на /feed /login — кидаем в ленту */}
                    <Route path="*" element={<Navigate to="/feed" replace />} />
                </>
            ) : (
                // Если не авторизован, рендерим публичные маршруты (Login, Register)
                <>
                    {publicRoutes.map(route => (
                        <Route 
                            key={route.path} 
                            path={route.path} 
                            element={<route.element />} 
                        />
                    ))}
                    {/* Любой другой путь отправляем на страницу регистрации (или логина) */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            )}
        </Routes>
    )
}

export default AppRouter