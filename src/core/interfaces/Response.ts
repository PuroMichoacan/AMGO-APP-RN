export interface Response<T = any> {
    data?: T;
    message?: string;
    alertType?: string;
    isSuccess: boolean;
    showMessage?: boolean;
    isContrasenaTemp?: boolean;
}