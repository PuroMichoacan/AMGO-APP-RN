// import { ScreenCode } from "./screens";

// type AppRoute = string;

// export const SCREEN_REGISTRY: Record<ScreenCode, AppRoute> = {
//   [ScreenCode.HSM_COILYARD_REGISTRO_SETS]: "/(app)/RegistroSet",
// };

// export function getRoute(code: string): AppRoute | null {
//   return SCREEN_REGISTRY[code as ScreenCode] ?? null;
// }

export const RouteRegistry = {
  HSM_COILYARD_PROCESO_CARGA: "/RegistroSet",
  HSM_COILYARD_TAB: "/coilyard/tab",
  //   HSM_COILYARD_REGISTRO_SETS: "/(app)/(HSM)/(CoilYard)/RegistroSet",
  HSM_COILYARD_REGISTRO_SETS: "/RegistroSet",
} as const;

export type ScreenKey = keyof typeof RouteRegistry;

type ScreenComponent = React.ComponentType<any>;

type ScreenRegistry = {
  [key: string]: ScreenComponent;
};
