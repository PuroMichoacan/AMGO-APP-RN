import { router } from "expo-router";
import { Alert } from "react-native";
import { RouteRegistry, ScreenKey } from "./ScreenRegistry";

export const resolveRoute = (key: string): string | null => {
  return RouteRegistry[key as ScreenKey] ?? null;
};

export const goTo = (clavePantalla: string) => {
  const route = resolveRoute(clavePantalla);
  if (!route) {
    Alert.alert("Pantalla no registrada", clavePantalla);
    return;
  }

  router.push({ pathname: route as any });
};
