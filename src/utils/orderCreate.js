import { DOMAIN, API_ORDER } from './api-constants';
import { request } from './request';

export function orderCreate(ingredients) {
    return request(`${DOMAIN}${API_ORDER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
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
