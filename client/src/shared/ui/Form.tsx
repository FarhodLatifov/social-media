import { type FormEvent, useRef, useState } from "react";
import { type IForm } from "../types/form.type";
import { NavLink, useNavigate } from "react-router";
import { useUsersStore } from "../../features/auth/store/usersStore";

const Form = ({ mode }: IForm) => {
  const loginName = useRef<HTMLInputElement | null>(null);
  const loginPassword = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState("");

  const isRegister = mode === "register";
  const loginUser = useUsersStore((state) => state.loginUser);
  const registerUser = useUsersStore((state) => state.registerUser);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = loginName.current?.value.trim() ?? "";
    const password = loginPassword.current?.value ?? "";
    const confirmPassword = confirmPasswordRef.current?.value ?? "";

    let newErrors = { username: "", password: "", confirmPassword: "" };
    let hasError = false;

    if (!username) {
      newErrors.username = "Введите имя пользователя";
      hasError = true;
    }

    if (!password) {
      newErrors.password = "Введите пароль";
      hasError = true;
    }

    if (isRegister) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Повторите пароль";
        hasError = true;
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
        hasError = true;
      }
    }

    setErrors(newErrors);
    setSubmitError("");

    if (hasError) return;

    const success = isRegister
      ? registerUser(username, password)
      : loginUser(username, password);

    if (!success) {
      setSubmitError(
        isRegister
          ? "Пользователь с таким именем уже существует"
          : "Неверное имя пользователя или пароль",
      );
      return;
    }

    navigate("/feed");
  };

  return (
    <div className="flex items-center my-8 justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* Заголовок */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {isRegister ? "Создать аккаунт" : "С возвращением"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isRegister ? "Пожалуйста, заполните данные для регистрации" : "Пожалуйста, введите данные для входа"}
          </p>
        </div>

        {/* Контейнер формы */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Имя пользователя
              </label>
              <input
                type="text"
                placeholder="Введите ваше имя"
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.username 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-indigo-500 focus:border-transparent"
                }`}
                ref={loginName}
              />
              {errors.username && (
                <span className="text-xs text-red-500 mt-1 block">{errors.username}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Пароль
              </label>
              <input
                type="password"
                placeholder="Введите пароль"
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-indigo-500 focus:border-transparent"
                }`}
                ref={loginPassword}
              />
              {errors.password && (
                <span className="text-xs text-red-500 mt-1 block">{errors.password}</span>
              )}
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Повторите пароль
                </label>
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  className={`w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.confirmPassword 
                      ? "border-red-500 focus:ring-red-500" 
                      : "border-gray-300 focus:ring-indigo-500 focus:border-transparent"
                  }`}
                  ref={confirmPasswordRef}
                />
                {errors.confirmPassword && (
                  <span className="text-xs text-red-500 mt-1 block">{errors.confirmPassword}</span>
                )}
              </div>
            )}
          </div>

          {/* Ссылки на переключение режима */}
          <div className="text-sm text-center">
            {!isRegister ? (
              <NavLink to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                У меня нет аккаунта
              </NavLink>
            ) : (
              <NavLink to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                У меня есть аккаунт
              </NavLink>
            )}
          </div>

          {submitError && (
            <div className="text-sm text-red-500 text-center">{submitError}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;