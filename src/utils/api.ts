import { setCookie, getCookie } from "./cookie";
import { TForgotPassword, TIngredient, TLoginUser, TPatchUser, TRegisterUser, TResetPassword } from "./types";

const WS_URL = "wss://norma.nomoreparties.space";
export const WS_URL_ALL = `${WS_URL}/orders/all`;
export const WS_URL_USER = `${WS_URL}/orders`;
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

function request(endpoint: string, options?: RequestInit) {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

function checkResponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

function requestWithRefresh(endpoint: string, options: RequestInit) {
    return request(endpoint, options)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }

                    const accessToken = refreshData.accessToken.split("Bearer ")[1];
                    const refreshToken = refreshData.refreshToken;
                    if (accessToken) {
                        setCookie("accessToken", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);
                    }

                    const reqHeaders = new Headers(options.headers);
                    reqHeaders.set('Authorization', refreshData.accessToken);
                    options.headers = reqHeaders;
                    return request(endpoint, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

function postOptions(obj: {}, auth?: boolean) {
    return requestOptions("POST", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {}, obj);
}

function getOptions(auth: boolean) {
    return requestOptions("GET", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {});
}

function patchOptions(obj: {}, auth?: boolean) {
    return requestOptions("PATCH", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {}, obj);
}

function requestOptions(method: 'GET' | 'POST' | 'PATCH', headers: {} = {}, body?: {}) {
    let opt: RequestInit = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            ...headers
        }
    };
    if (body) {
        opt.body = JSON.stringify(body);
    }
    return opt;
}

export function dataLoad() {
    return request(API_LOAD);
}

export function orderCreate(ingredients: Array<TIngredient>) {
    return requestWithRefresh(API_ORDER, postOptions({ingredients: ingredients.map(item => item._id)}, true));
}

export function orderGet(orderNum?: string) {
    return request(`${API_ORDER}/${orderNum}`);
}

export function registerUser(user: TRegisterUser) {
    return request(API_REGISTER, postOptions(user));
}

export function loginUser(user: TLoginUser) {
    return request(API_LOGIN, postOptions(user));
}

export function logoutUser() {
    return request(API_LOGOUT, postOptions({ token: localStorage.getItem("refreshToken") }));
}

export function forgotPassword(form: TForgotPassword) {
    return request(API_FORGOT_PASSWORD, postOptions(form));
}

export function resetPassword(form: TResetPassword) {
    return request(API_RESET_PASSWORD, postOptions(form));
}

export function refreshToken() {
    return request(API_TOKEN, postOptions({ token: localStorage.getItem("refreshToken") }));
}

export function getUser() {
    return requestWithRefresh(API_USER, getOptions(true));
}

export function patchUser(user: TPatchUser) {
    return requestWithRefresh(API_USER, patchOptions(user, true));
}