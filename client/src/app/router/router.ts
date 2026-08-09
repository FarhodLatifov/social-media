import { type IRoute } from "./router.type";
import Login from "../../shared/ui/Login";
import Register from "../../shared/ui/Register";
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
