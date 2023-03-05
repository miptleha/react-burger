import { setCookie, getCookie } from "./cookie";
import { TIngredientConstructor } from "./types";

const BASE_URL = "https://norma.nomoreparties.space/api/";
const API_LOAD = "ingredients";
const API_ORDER = "orders";
const API_LOGIN = "auth/login";
const API_REGISTER = "auth/register";
const API_LOGOUT = "auth/logout";
const API_TOKEN = "auth/token";
const API_USER = "auth/user";
const API_FORGOT_PASSWORD = "password-reset";
const API_RESET_PASSWORD = "password-reset/reset";

const CONTENT_TYPE = {
    'Content-Type': 'application/json;charset=utf-8'
};

function request(endpoint: string, options?: any) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

function checkResponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function requestWithRefresh(endpoint: string, options: any) {
    return request(endpoint, options)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }
                    localStorage.setItem("refreshToken", refreshData.refreshToken);
                    setCookie("accessToken", refreshData.accessToken);
                    options.headers.authorization = refreshData.accessToken;
                    return request(endpoint, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

export function dataLoad() {
    return request(API_LOAD);
}

export function orderCreate(ingredients: Array<TIngredientConstructor>) {
    return request(API_ORDER, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
    });
}

export type TRegisterUser = {
    name: string;
    email: string;
    password: string;
};

export function registerUser(user: TRegisterUser) {
    return request(API_REGISTER, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({ ...user })
    });
}

export type TLoginUser = {
    email: string;
    password: string;
};

export function loginUser(user: TLoginUser) {
    return request(API_LOGIN, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({ ...user })
    });
}

export function logoutUser() {
    return request(API_LOGOUT, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
}

export type TForgotPassword = {
    email: string;
};

export function forgotPassword(form: TForgotPassword) {
    return request(API_FORGOT_PASSWORD, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({ ...form })
    });
}

export type TResetPassword = {
    password: string;
    token: string;
};

export function resetPassword(form: TResetPassword) {
    return request(API_RESET_PASSWORD, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({ ...form })
    });
}

export function refreshToken() {
    return request(API_TOKEN, {
        method: "POST",
        headers: {
            ...CONTENT_TYPE
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
}

export function getUser() {
    return requestWithRefresh(API_USER, {
        method: "GET",
        headers: {
            ...CONTENT_TYPE,
            Authorization: "Bearer " + getCookie("accessToken")
        }
    });
}

export type TPatchUser = {
    name: string;
    email: string;
    password: string;
};

export function patchUser(user: TPatchUser) {
    return requestWithRefresh(API_USER, {
        method: "PATCH",
        headers: {
            ...CONTENT_TYPE,
            Authorization: "Bearer " + getCookie("accessToken")
        },
        body: JSON.stringify({ ...user })
    });
}