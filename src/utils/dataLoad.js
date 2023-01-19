import { DOMAIN, API_LOAD, STATUS_OK } from './api-constants';

export function dataLoad() {
    return fetch(`${DOMAIN}${API_LOAD}`)
    .then(res => {
        if (res.status !== STATUS_OK) {
            throw Error(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
        }
        return res.json();
    })
    .then(res => {
        if (!res.success) {
            throw Error('В json-ответе success !== true');
        }
        
        if (res.data && res.data.length > 0) {
            return res.data;
        } else {
            throw Error('Возвращен пустой или некорректный набор данных');
        }
    });
}
