import { DOMAIN, API_ORDER, STATUS_OK } from './api-constants';

export function orderCreate(ingredients) {
    return fetch(`${DOMAIN}${API_ORDER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
    })
        .then(res => {
            if (res.status !== STATUS_OK) {
                console.log(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
            }
            return res.json();
        })
        .then(res => {
            if (res.success) {

                if (res.order && typeof res.order.number === "number") {
                    return res.order.number;
                } else {
                    throw Error('Не найден order.number внутри ответа');
                }
            }
            else {
                throw Error(`Ошибка от сервера: ${res.message}`);
            }
        });
}
