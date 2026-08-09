import type { ComponentType } from "react";

export interface IRoute {
  path: string;
  element: ComponentType;
}
