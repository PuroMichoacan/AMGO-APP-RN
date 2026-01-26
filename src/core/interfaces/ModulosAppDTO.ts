export interface ModulosAppDTO{
    idModulo:    number;
    nombre:      string;
    descripcion: null;
    icono:       string;
    orden:       number;
    pantallas:   PantallasDTO[];

}

export interface PantallasDTO{
    idPantalla:     number;
    nombrePantalla: string;
    rutaPantalla:   string;
    descripcion:    null;
    orden:          string;
    icono:          string;
    permisos:       PermisosAppDTO[];

}

export interface PermisosAppDTO {
    idPermiso  :string;
    nombre : string;
    codigo : string;
}