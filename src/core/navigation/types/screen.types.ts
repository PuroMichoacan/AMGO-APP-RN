import { ComponentType } from "react";

export type ScreenDefinition = {
  screenKey: string;
  titulo: string;
  moduleKey: string;
  component: ComponentType<any>;
  icon?: string;
  requiresAuth?: boolean;
  canGoBack?: boolean;
  showDrawer?: boolean;
};
