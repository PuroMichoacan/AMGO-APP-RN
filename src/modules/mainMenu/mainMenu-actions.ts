import { baseApi } from "@/core/api/baseApi";
import { Response } from "@/core/interfaces/Response";

export interface BannerAppDTO {
  idSeguridadBanner: number;
  nombre: string;
  imagen: string;
}
export const getBannerCarrouselAsync = async (): Promise<BannerAppDTO[]> => {
  try {
    const banner = await baseApi.get<Response<BannerAppDTO[]>>(
      "api/v1/AmgoApp/Login/GetBannerCarrusel",
    );
    return banner?.data?.data ?? [];
  } catch (error) {
    console.log("Error al obtener el carrousel de la app", error);
    return [];
  }
};
