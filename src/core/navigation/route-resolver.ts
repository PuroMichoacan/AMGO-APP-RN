import { router } from "expo-router";
// import { RouteRegistry, ScreenKey } from "./ScreenRegistry";

// export const resolveRoute = (key: string): string | null => {
//   return RouteRegistry[key as ScreenKey] ?? null;
// };

export const goTo = (clavePantalla: string) => {
  // const route = resolveRoute(clavePantalla);
  // if (!route) {
  //   Alert.alert("Pantalla no registrada", clavePantalla);
  //   return;
  // }

  console.log("Navegando a pantalla: ", clavePantalla);
  router.push(`/screen/${clavePantalla}`);
};
