import type { ComponentType } from "react";

export interface IRoute {
  path: string;
  element: ComponentType;
}
export enum AppRoutes {
  LOGIN = '/login',
  REGISTER = '/',
  FEED = '/feed',
  PROFILE = '/profile/:username',
  MY_PROFILE = '/profile',
  SEARCH = '/search',
}