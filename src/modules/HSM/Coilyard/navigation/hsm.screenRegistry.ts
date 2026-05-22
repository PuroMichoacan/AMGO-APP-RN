import { ScreenDefinition } from "@/core/navigation/types/screen.types";
import PosicionamientoSets from "../screens/PosicionamientoSets";
import ProcesoCarga from "../screens/ProcesoCarga";
// import RegistroSets from "../screens/RegistroSets";

export const HSMScreens: Record<string, ScreenDefinition> = {
  HSM_COILYARD_REGISTRO_SETS: {
    screenKey: "HSM_COILYARD_REGISTRO_SETS",
    moduleKey: "HSM",
    titulo: "Registro set",
    component: PosicionamientoSets,
    canGoBack: true,
    showDrawer: false,
  },
  HSM_COILYARD_PROCESO_CARGA: {
    screenKey: "HSM_COILYARD_PROCESO_CARGA",
    moduleKey: "HSM",
    titulo: "Proceso de carga",
    component: ProcesoCarga,
    canGoBack: true,
    showDrawer: false,
  },
};
