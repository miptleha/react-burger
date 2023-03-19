import { registerUser, loginUser, logoutUser, refreshToken, forgotPassword, resetPassword, getUser, patchUser } from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { AppDispatch, TForgotPassword, TLoginUser, TPatchUser, TRegisterUser, TResetPassword, TUser } from "../../utils/types";

export const AUTH_REGISTER_START = "AUTH_REGISTER_START";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_ERROR = "AUTH_REGISTER_ERROR";

export const AUTH_LOGIN_START = "AUTH_LOGIN_START";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";

export const AUTH_LOGOUT_START = "AUTH_LOGOUT_START";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_ERROR = "AUTH_LOGOUT_ERROR";

export const AUTH_TOKEN_START = "AUTH_TOKEN_START";
export const AUTH_TOKEN_SUCCESS = "AUTH_TOKEN_SUCCESS";
export const AUTH_TOKEN_ERROR = "AUTH_TOKEN_ERROR";

export const AUTH_FORGOT_PASSWORD_START = "AUTH_FORGOT_PASSWORD_START";
export const AUTH_FORGOT_PASSWORD_SUCCESS = "AUTH_FORGOT_PASSWORD_SUCCESS";
export const AUTH_FORGOT_PASSWORD_ERROR = "AUTH_FORGOT_PASSWORD_ERROR";

export const AUTH_RESET_PASSWORD_START = "AUTH_RESET_PASSWORD_START";
export const AUTH_RESET_PASSWORD_SUCCESS = "AUTH_RESET_PASSWORD_SUCCESS";
export const AUTH_RESET_PASSWORD_ERROR = "AUTH_RESET_PASSWORD_ERROR";

export const AUTH_GET_USER_START = "AUTH_GET_USER_START";
export const AUTH_GET_USER_SUCCESS = "AUTH_GET_USER_SUCCESS";
export const AUTH_GET_USER_ERROR = "AUTH_GET_USER_ERROR";

export const AUTH_PATCH_USER_START = "AUTH_PATCH_USER_START";
export const AUTH_PATCH_USER_SUCCESS = "AUTH_PATCH_USER_SUCCESS";
export const AUTH_PATCH_USER_ERROR = "AUTH_PATCH_USER_ERROR";

export interface IAuthRegisterStartAction {
    readonly type: typeof AUTH_REGISTER_START;
}

export interface IAuthRegisterSuccessAction {
    readonly type: typeof AUTH_REGISTER_SUCCESS;
    readonly user: TUser;
}

export interface IAuthRegisterErrorAction {
    readonly type: typeof AUTH_REGISTER_ERROR;
    readonly message: string;
}

export interface IAuthLoginStartAction {
    readonly type: typeof AUTH_LOGIN_START;
}

export interface IAuthLoginSuccessAction {
    readonly type: typeof AUTH_LOGIN_SUCCESS;
    readonly user: TUser;
}

export interface IAuthLoginErrorAction {
    readonly type: typeof AUTH_LOGIN_ERROR;
    readonly message: string;
}

export interface IAuthLogoutStartAction {
    readonly type: typeof AUTH_LOGOUT_START;
}

export interface IAuthLogoutSuccessAction {
    readonly type: typeof AUTH_LOGOUT_SUCCESS;
}

export interface IAuthLogoutErrorAction {
    readonly type: typeof AUTH_LOGOUT_ERROR;
    readonly message: string;
}

export interface IAuthTokenStartAction {
    readonly type: typeof AUTH_TOKEN_START;
}

export interface IAuthTokenSuccessAction {
    readonly type: typeof AUTH_TOKEN_SUCCESS;
    readonly user: TUser;
}

export interface IAuthTokenErrorAction {
    readonly type: typeof AUTH_TOKEN_ERROR;
    readonly message: string;
}

export interface IAuthForgotPasswordStartAction {
    readonly type: typeof AUTH_FORGOT_PASSWORD_START;
}

export interface IAuthForgotPasswordSuccessAction {
    readonly type: typeof AUTH_FORGOT_PASSWORD_SUCCESS;
}

export interface IAuthForgotPasswordErrorAction {
    readonly type: typeof AUTH_FORGOT_PASSWORD_ERROR;
    readonly message: string;
}

export interface IAuthResetPasswordStartAction {
    readonly type: typeof AUTH_RESET_PASSWORD_START;
}

export interface IAuthResetPasswordSuccessAction {
    readonly type: typeof AUTH_RESET_PASSWORD_SUCCESS;
}

export interface IAuthResetPasswordErrorAction {
    readonly type: typeof AUTH_RESET_PASSWORD_ERROR;
    readonly message: string;
}

export interface IAuthGetUserStartAction {
    readonly type: typeof AUTH_GET_USER_START;
}

export interface IAuthGetUserSuccessAction {
    readonly type: typeof AUTH_GET_USER_SUCCESS;
    readonly user: TUser;
}

export interface IAuthGetUserErrorAction {
    readonly type: typeof AUTH_GET_USER_ERROR;
    readonly message: string;
}

export interface IAuthPatchUserStartAction {
    readonly type: typeof AUTH_PATCH_USER_START;
}

export interface IAuthPatchUserSuccessAction {
    readonly type: typeof AUTH_PATCH_USER_SUCCESS;
    readonly user: TUser;
}

export interface IAuthPatchUserErrorAction {
    readonly type: typeof AUTH_PATCH_USER_ERROR;
    readonly message: string;
}

export type TAuthActions = 
    IAuthRegisterStartAction  | IAuthRegisterSuccessAction | IAuthRegisterErrorAction |
    IAuthLoginStartAction  | IAuthLoginSuccessAction | IAuthLoginErrorAction |
    IAuthLogoutStartAction  | IAuthLogoutSuccessAction | IAuthLogoutErrorAction |
    IAuthTokenStartAction  | IAuthTokenSuccessAction | IAuthTokenErrorAction |
    IAuthResetPasswordStartAction  | IAuthResetPasswordSuccessAction | IAuthResetPasswordErrorAction |
    IAuthForgotPasswordStartAction  | IAuthForgotPasswordSuccessAction | IAuthForgotPasswordErrorAction |
    IAuthGetUserStartAction  | IAuthGetUserSuccessAction | IAuthGetUserErrorAction |
    IAuthPatchUserStartAction  | IAuthPatchUserSuccessAction | IAuthPatchUserErrorAction;

export const authRegisterAction = (form: TRegisterUser) => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_REGISTER_START });
    return registerUser(form)
        .then(result => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            const refreshToken = result.refreshToken;
            if (accessToken) {
                setCookie("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }

            dispatch({ type: AUTH_REGISTER_SUCCESS, user: result.user });
        })
        .catch(err => {
            dispatch({ type: AUTH_REGISTER_ERROR, message: err.message });
        });
}

export const authLoginAction = (form: TLoginUser) => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_LOGIN_START });
    return loginUser(form)
        .then(result => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            const refreshToken = result.refreshToken;
            if (accessToken) {
                setCookie("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }

            dispatch({ type: AUTH_LOGIN_SUCCESS, user: result.user });
        })
        .catch(err => {
            dispatch({ type: AUTH_LOGIN_ERROR, message: err.message });
        });
}

export const authLogoutAction = () => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_LOGOUT_START });
    return logoutUser()
        .then(result => {
            dispatch({ type: AUTH_LOGOUT_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: AUTH_LOGOUT_ERROR, message: err.message });
        })
        .finally(() => {
            //и в случае успеха, и в случае ошибки (пользователь вышел в другой вкладке)
            localStorage.removeItem("refreshToken");
            deleteCookie("accessToken");
        });
}

export const authTokenAction = () => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_TOKEN_START });
    return refreshToken()
        .then(result => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            const refreshToken = result.refreshToken;
            if (accessToken) {
                setCookie("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
            }

            dispatch({ type: AUTH_TOKEN_SUCCESS, user: result });
        })
        .catch(err => {
            dispatch({ type: AUTH_TOKEN_ERROR, message: err.message });
        });
}

export const authForgotPasswordAction = (form: TForgotPassword) => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_FORGOT_PASSWORD_START });
    return forgotPassword(form)
        .then(result => {
            dispatch({ type: AUTH_FORGOT_PASSWORD_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: AUTH_FORGOT_PASSWORD_ERROR, message: err.message });
        });
}

export const authResetPasswordAction = (form: TResetPassword) => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_RESET_PASSWORD_START });
    return resetPassword(form)
        .then(result => {
            dispatch({ type: AUTH_RESET_PASSWORD_SUCCESS });
        })
        .catch(err => {
            dispatch({ type: AUTH_RESET_PASSWORD_ERROR, message: err.message });
        });
}

export const authCheckUserAction = () => (dispatch: AppDispatch) => {
    if (getCookie("accessToken")) {
        dispatch(authGetUserAction());
    }
}

export const authGetUserAction = () => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_GET_USER_START });
    return getUser()
        .then(result => {
            dispatch({ type: AUTH_GET_USER_SUCCESS, user: result.user });
        })
        .catch(err => {
            dispatch({ type: AUTH_GET_USER_ERROR, message: err.message });
        });
}

export const authPatchUserAction = (form: TPatchUser) => (dispatch: AppDispatch) => {
    dispatch({ type: AUTH_PATCH_USER_START });
    return patchUser(form)
        .then(result => {
            dispatch({ type: AUTH_PATCH_USER_SUCCESS, user: result.user });
        })
        .catch(err => {
            dispatch({ type: AUTH_PATCH_USER_ERROR, message: err.message });
        });
}
