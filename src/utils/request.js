import { STATUS_OK } from './api-constants';

export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
    if (res.status !== STATUS_OK) {
        console.log(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
    }
    return res.json();
}