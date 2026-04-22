export interface ModulosAppDTO {
  idModulo: number;
  codigoModulo: string;
  nombre: string;
  descripcion: null;
  icono: string;
  orden: number;
  pantallas: PantallasDTO[];
}

export interface PantallasDTO {
  idPantalla: number;
  codigoPantalla: string;
  nombrePantalla: string;
  rutaPantalla: string;
  descripcion: null;
  orden: string;
  icono: string;
  nombreIcono: string;
  permisos: PermisosAppDTO[];
}

export interface PermisosAppDTO {
  idPermiso: string;
  nombre: string;
  codigo: string;
}
