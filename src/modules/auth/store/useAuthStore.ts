import { setBaseUrl } from '@/core/api/baseApi';
import { SecureStorageAdapter } from '@/core/helpers/secure-storage.adapter';
import { UsuarioaAppDTO } from '@/core/interfaces/UsuarioAppDTO';
import { create } from 'zustand';
import { LoginAsync } from '../actions/auth-actions';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';
export type Environment = 'DEV' | 'QAS' | 'PROD';
export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: UsuarioaAppDTO;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkStatus: () => Promise<void>;
    changeStatus: (token?: string, user?: UsuarioaAppDTO) => Promise<boolean>;
    environment: Environment;
    setEnvironment: (env: Environment) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({

    //Props
    status: 'checking',
    token: undefined,
    user: undefined,
    environment: 'PROD', // prod por default

    // metodos - acciones

    changeStatus: async (token?: string, user?: UsuarioaAppDTO) => {

        if (!token) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            await SecureStorageAdapter.deleteItem('token');
            return false;
        }

        set({
            status: 'authenticated',
            token: token,
            user: user
        });
        await SecureStorageAdapter.setItem('token', token);
        return true;
    },


    login: async (email: string, password: string) => {
        const resp = await LoginAsync(email, password);

        return get().changeStatus(resp?.data?.acessToken, resp?.data?.usuario);
    },

    logout: async () => {

        await SecureStorageAdapter.deleteItem('token');
        await SecureStorageAdapter.deleteItem('env');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },

    checkStatus: async () => {

        // 1. Obtener environment guardado
        const storedEnv = await SecureStorageAdapter.getItem('env');

        const env = (storedEnv as Environment) ?? 'PROD';
        set({ environment: env });
        setBaseUrl(env);

        const token = await SecureStorageAdapter.getItem('token');

        if (token === null) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }

        set({
            status: 'authenticated',
            token: token,
            user: undefined
        });




    },

    setEnvironment: async (env) => {
        set({ environment: env }),
            setBaseUrl(env);
        await SecureStorageAdapter.setItem('env', env);
    },

}))