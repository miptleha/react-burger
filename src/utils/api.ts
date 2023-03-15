import { setCookie, getCookie } from "./cookie";
import { TForgotPassword, TIngredientConstructor, TLoginUser, TPatchUser, TRegisterUser, TResetPassword } from "./types";

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

function postOptions(obj: {}) {
    return requestOptions("POST", {}, obj);
}

function getOptions(auth: boolean) {
    return requestOptions("GET", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {});
}

function patchOptions(auth: boolean, obj: {}) {
    return requestOptions("PATCH", auth ? { Authorization: "Bearer " + getCookie("accessToken") } : {}, obj);
}

function requestOptions(method: 'GET' | 'POST' | 'PATCH', headers: {} = {}, body?: {}) {
    let opt: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'accept': 'application/json',
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

export function orderCreate(ingredients: Array<TIngredientConstructor>) {
    return request(API_ORDER, postOptions({ingredients: ingredients.map(item => item._id)}));
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
    return requestWithRefresh(API_USER, patchOptions(true, user));
}