import { DOMAIN, API_LOAD } from './api-constants';
import { request } from './request';

export function dataLoad() {
    return request(`${DOMAIN}${API_LOAD}`)
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
