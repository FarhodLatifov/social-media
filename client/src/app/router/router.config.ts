import { type IRoute } from "./router.types";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Feed from "../../pages/Feed/Feed";
import Profile from "../../pages/Profile/Profile";
import Search from "../../pages/Search/Search";

export const publicRoutes: IRoute[] = [
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/",
    element: Register,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/feed",
    element: Feed,
  },
  {
    path: "/search",
    element: Search,
  },
];
