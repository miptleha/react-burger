const DOMAIN = "https://norma.nomoreparties.space";
const API = "/api/ingredients";
const STATUS_OK = 200;

export function dataLoad() {
    return fetch(`${DOMAIN}${API}`)
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
            return Promise.resolve(res.data);
        }
        else {
            throw Error('возвращен пустой или некорректный набор данных');
        }
    });
}
