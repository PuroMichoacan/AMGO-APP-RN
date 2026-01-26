import { baseApi } from "@/core/api/baseApi";
import { ModulosAppDTO } from "@/core/interfaces/ModulosAppDTO";
import { Response } from "@/core/interfaces/Response";
import { UsuarioaAppDTO } from "@/core/interfaces/UsuarioAppDTO";

export interface LoginResponseDTO {
    acessToken:            string;
    accessTokenExpiration: Date;
    refreshToken:          string;
    usuario:               UsuarioaAppDTO;
    modulos:               ModulosAppDTO[];
}

const returnUserToken = (data : LoginResponseDTO) => {

    const {usuario,modulos: Modulos,acessToken: AccessToken,accessTokenExpiration: AccessTokenExpiration,refreshToken: RefreshToken } = data;


    return {
        usuario,
        AccessToken
    }

}



export const LoginAsync = async(email : string, password : string) => {
    try{

        const {data} = await baseApi.post<Response<LoginResponseDTO>>('api/v1/AmgoApp/Login/AMGOAPPLogin',{
            email,
            password
        });

        console.log({data});

        return data

    }catch(error){        
        console.log(error);
        return null;
    }
}

