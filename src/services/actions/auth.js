import { registerUser, loginUser, logoutUser, refreshToken, forgotPassword, resetPassword, getUser, patchUser } from "../../utils/api";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

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

export function authRegisterAction(form) {
    return function (dispatch) {
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
}

export function authLoginAction(form) {
    return function (dispatch) {
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
}

export function authLogoutAction() {
    return function (dispatch) {
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
}

export function authTokenAction() {
    return function (dispatch) {
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
                dispatch({ type: AUTH_TOKEN_ERROR });
            });
    }
}

export function authForgotPasswordAction(form) {
    return function (dispatch) {
        dispatch({ type: AUTH_FORGOT_PASSWORD_START });
        return forgotPassword(form)
            .then(result => {
                dispatch({ type: AUTH_FORGOT_PASSWORD_SUCCESS });
            })
            .catch(err => {
                dispatch({ type: AUTH_FORGOT_PASSWORD_ERROR, message: err.message });
            });
    }
}

export function authResetPasswordAction(form) {
    return function (dispatch) {
        dispatch({ type: AUTH_RESET_PASSWORD_START });
        return resetPassword(form)
            .then(result => {
                dispatch({ type: AUTH_RESET_PASSWORD_SUCCESS });
            })
            .catch(err => {
                dispatch({ type: AUTH_RESET_PASSWORD_ERROR, message: err.message });
            });
    }
}

export function authCheckUserAction() {
    return function (dispatch) {
        if (getCookie("accessToken")) {
            dispatch(authGetUserAction())
        }
    }
}

export function authGetUserAction() {
    return function (dispatch) {
        dispatch({ type: AUTH_GET_USER_START });
        return getUser()
            .then(result => {
                dispatch({ type: AUTH_GET_USER_SUCCESS, user: result.user });
            })
            .catch(err => {
                dispatch({ type: AUTH_GET_USER_ERROR, message: err.message });
            });
    }
}

export function authPatchUserAction(form) {
    return function (dispatch) {
        dispatch({ type: AUTH_PATCH_USER_START });
        return patchUser(form)
            .then(result => {
                dispatch({ type: AUTH_PATCH_USER_SUCCESS, user: result.user });
            })
            .catch(err => {
                dispatch({ type: AUTH_PATCH_USER_ERROR, message: err.message });
            });
    }
}