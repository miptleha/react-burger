import { setCookie, getCookie } from "./cookie";

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

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}
function requestWithRefresh(url, options) {
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

export function orderCreate(ingredients) {
    return request(`${DOMAIN}${API_ORDER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
    });
}

export function registerUser(user) {
    return request(`${DOMAIN}${API_REGISTER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...user })
    });
}

export function loginUser(user) {
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

export function forgotPassword(form) {
    return request(`${DOMAIN}${API_FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...form })
    });
}

export function resetPassword(form) {
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

export function patchUser(user) {
    return requestWithRefresh(`${DOMAIN}${API_USER}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        },
        body: JSON.stringify({ ...user })
    });
}