import { baseApi } from "@/core/api/baseApi";
import { ModulosAppDTO } from "@/core/interfaces/ModulosAppDTO";
import { Response } from "@/core/interfaces/Response";
import { UsuarioaAppDTO } from "@/core/interfaces/UsuarioAppDTO";

export interface LoginResponseDTO {
  acessToken: string;
  accessTokenExpiration: Date;
  refreshToken: string;
  usuario: UsuarioaAppDTO;
  modulos: ModulosAppDTO[];
}

const returnUserToken = (data: LoginResponseDTO) => {
  const {
    usuario,
    modulos: Modulos,
    acessToken: AccessToken,
    accessTokenExpiration: AccessTokenExpiration,
    refreshToken: RefreshToken,
  } = data;

  return {
    usuario,
    AccessToken,
  };
};

export const LoginAsync = async (email: string, password: string) => {
  try {
    const { data } = await baseApi.post<Response<LoginResponseDTO>>(
      "api/v1/AmgoApp/Login/AMGOAPPLogin",
      {
        email,
        password,
      },
    );

    console.log({ data });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getModulosAsync = async (
  email: string,
): Promise<ModulosAppDTO[]> => {
  try {
    const resp = await baseApi.get<Response<ModulosAppDTO[]>>(
      `api/v1/AmgoApp/Login/GetPantallasAsignadas/${email}`,
    );
    return resp?.data.data ?? [];
  } catch (error) {
    console.log("Error al obtener los modulos", error);
    return [];
  }
};
