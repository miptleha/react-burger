import { setCookie, getCookie } from "./cookie";
import { TIngredientConstructor } from "./types";

const DOMAIN = "https://norma.nomoreparties.space";
const API_LOAD = "/api/ingredients";
const API_ORDER = "/api/orders";
const API_LOGIN = "/api/auth/login";
const API_REGISTER = "/api/auth/register";
const API_LOGOUT = "/api/auth/logout";
const API_TOKEN = "/api/auth/token";
const API_USER = "/api/auth/user";
const API_FORGOT_PASSWORD = "/api/password-reset";
const API_RESET_PASSWORD = "/api/password-reset/reset";

type TResponse<T> = Response & {
    json(): Promise<T>
}
  
function request(url: string, options?: any) {
    return fetch(url, options).then(checkResponse);
}

function checkResponse<T>(res: TResponse<T>) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function requestWithRefresh(url: string, options: any) {
    return fetch(url, options)
        .then(checkResponse)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }
                    localStorage.setItem("refreshToken", refreshData.refreshToken);
                    setCookie("accessToken", refreshData.accessToken);
                    options.headers.authorization = refreshData.accessToken;
                    return request(url, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

export function dataLoad() {
    return request(`${DOMAIN}${API_LOAD}`);
}

export function orderCreate(ingredients: Array<TIngredientConstructor>) {
    return request(`${DOMAIN}${API_ORDER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
    });
}

export type TRegisterUser = {
    name: string;
    email: string;
    password: string;
}

export function registerUser(user: TRegisterUser) {
    return request(`${DOMAIN}${API_REGISTER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...user })
    });
}

export type TLoginUser = {
    email: string;
    password: string;
}

export function loginUser(user: TLoginUser) {
    return request(`${DOMAIN}${API_LOGIN}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...user })
    });
}

export function logoutUser() {
    return request(`${DOMAIN}${API_LOGOUT}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 
            token: localStorage.getItem("refreshToken") 
        })
    });
}

export type TForgotPassword = {
    email: string;
}

export function forgotPassword(form: TForgotPassword) {
    return request(`${DOMAIN}${API_FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...form })
    });
}

export type TResetPassword = {
    password: string;
    token: string;
}

export function resetPassword(form: TResetPassword) {
    return request(`${DOMAIN}${API_RESET_PASSWORD}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...form })
    });
}

export function refreshToken() {
    return request(`${DOMAIN}${API_TOKEN}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
}

export function getUser() {
    return requestWithRefresh(`${DOMAIN}${API_USER}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        }
    });
}

export type TPatchUser = {
    name: string;
    email: string;
    password: string;
}

export function patchUser(user: TPatchUser) {
    return requestWithRefresh(`${DOMAIN}${API_USER}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        },
        body: JSON.stringify({ ...user })
    });
}