export interface UsuarioaAppDTO{
     idUsuario: number;
    nombre:    string;
    imageURL:  null;
    email:     string;
    roles:     RolesAppDTO[];
}

export interface RolesAppDTO{
    idRol : number;
    rol : string;
}