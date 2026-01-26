import { SecureStorageAdapter } from '@/core/helpers/secure-storage.adapter';
import { UsuarioaAppDTO } from '@/core/interfaces/UsuarioAppDTO';
import { create } from 'zustand';
import { LoginAsync } from '../actions/auth-actions';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: UsuarioaAppDTO;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkStatus: () => Promise<void>;
    changeStatus: (token?: string, user?: UsuarioaAppDTO) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({

    //Props
    status: 'checking',
    token: undefined,
    user: undefined,

    // metodos - acciones

    changeStatus: async (token?: string, user?: UsuarioaAppDTO) => {

        //TODO : VERIFICAR LAS PANTALLAS O EL OBJETO DE USUARIO QUE ESTE GUARDADO
        console.log('data recibida en changeStatus',{token,user});
        if (!token) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            await SecureStorageAdapter.deleteItem('token');
            return false;
        }


        //TODO Ver como guardar el usuario

        set({
            status: 'authenticated',
            token: token,
            user: user
        });
        await SecureStorageAdapter.setItem('token',token);
        return true;
    },


    login: async (email: string, password: string) => {
        const resp = await LoginAsync(email, password);            

        return get().changeStatus(resp?.data?.acessToken,resp?.data?.usuario);
    },

    logout: async () => {

        SecureStorageAdapter.deleteItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },

    checkStatus: async () => {


        let token = await SecureStorageAdapter.getItem('token');

        if(token === null){
            set({status : 'unauthenticated',token : undefined, user:undefined});
            return;
        }

        set({
            status : 'authenticated',
            token : token,
            user : undefined
        });




    },



}))