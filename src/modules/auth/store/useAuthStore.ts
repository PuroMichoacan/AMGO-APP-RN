import { setBaseUrl } from "@/core/api/baseApi";
import { SecureStorageAdapter } from "@/core/helpers/secure-storage.adapter";
import { ModulosAppDTO } from "@/core/interfaces/ModulosAppDTO";
import { UsuarioaAppDTO } from "@/core/interfaces/UsuarioAppDTO";
import { create } from "zustand";
import { getModulosAsync, LoginAsync } from "../actions/auth-actions";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";
export type Environment = "DEV" | "QAS" | "PROD";
export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: UsuarioaAppDTO;
  modulos: ModulosAppDTO[];

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
  changeStatus: (token?: string, user?: UsuarioaAppDTO) => Promise<boolean>;
  environment: Environment;
  setEnvironment: (env: Environment) => void;
  setModulos: (pantallas: ModulosAppDTO[]) => Promise<void>;
  loadModulos: () => Promise<void>;
  ensureModulos: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Props
  status: "checking",
  token: undefined,
  user: undefined,
  environment: "PROD", // prod por default
  modulos: [],

  // metodos - acciones

  changeStatus: async (token?: string, user?: UsuarioaAppDTO) => {
    if (!token) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      await SecureStorageAdapter.deleteItem("user");
      await SecureStorageAdapter.deleteItem("pantallas");

      return false;
    }

    set({
      status: "authenticated",
      token,
      user,
    });

    await SecureStorageAdapter.setItem("token", token);

    if (user) {
      await SecureStorageAdapter.setItem("user", JSON.stringify(user));
    }

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await LoginAsync(email, password);

    //si el login es exitoso retorna un objeto con los modulos asignados
    await get().setModulos(resp?.data?.modulos ?? []);
    return get().changeStatus(resp?.data?.acessToken, resp?.data?.usuario);
  },

  logout: async () => {
    await SecureStorageAdapter.deleteItem("token");
    await SecureStorageAdapter.deleteItem("env");
    await SecureStorageAdapter.deleteItem("user");
    await SecureStorageAdapter.deleteItem("pantallas");

    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
      modulos: [],
    });
  },

  checkStatus: async () => {
    // 1. Obtener environment guardado
    const storedEnv = await SecureStorageAdapter.getItem("env");
    console.log('Ambiente guardado: ',storedEnv);
    const env = (storedEnv as Environment) ?? "PROD"; // ambiente guardado previamente

    set({ environment: env });
    setBaseUrl(env);
    const token = await SecureStorageAdapter.getItem("token");
    if (!token) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return;
    }

    await get().loadUser();
    await get().loadModulos();

    set({
      status: "authenticated",
      token: token,
      user: get().user,
    });
  },

  setEnvironment: async (env) => {
    (set({ environment: env }), setBaseUrl(env));
    await SecureStorageAdapter.setItem("env", env);
  },

  setModulos: async (pantallas) => {
    set({ modulos: pantallas }); // asignar en memoria
    await SecureStorageAdapter.setItem("pantallas", JSON.stringify(pantallas));
  },

  loadModulos: async () => {
    const modulos = await SecureStorageAdapter.getItem("pantallas");

    if (!modulos) {
      set({ modulos: [] });
      return;
    }

    try {
      const parsed = JSON.parse(modulos) as ModulosAppDTO[];
      set({ modulos: parsed });
    } catch {
      set({ modulos: [] });
    }
  },
  ensureModulos: async () => {
    const { modulos, user } = get();

    // si los modulos ya estan en memoria no se hace nada
    if (modulos && modulos.length > 0) return;

    //si no, intenta cargarlos desde el storage
    await get().loadModulos();

    const { modulos: afterLoad } = get();

    if (afterLoad && afterLoad.length > 0) return;

    // si no, los refresca del backend

    if (!user) return;

    const fresh = await getModulosAsync(user?.email);

    if (fresh.length > 0) {
      await get().setModulos(fresh);
    }
  },
  loadUser: async () => {
    const user = await SecureStorageAdapter.getItem("user");
    if (!user) {
      set({ user: undefined });
      return;
    }

    try {
      const parsedUser = JSON.parse(user) as UsuarioaAppDTO;
      set({ user: parsedUser });
    } catch (error) {
      console.log("Error parsing user", error);
      set({ user: undefined });
    }
  },
}));
