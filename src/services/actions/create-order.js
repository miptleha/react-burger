import { orderCreate } from '../../utils/orderCreate';

export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function createOrderAction(ingredients) {
    return function(dispatch) {
        dispatch({ type: CREATE_ORDER_START });
        orderCreate(ingredients)
        .then(data => {
            dispatch({ type: CREATE_ORDER_SUCCESS, orderNumber: data });
        })
        .catch(err => {
            console.log('ошибка создания заказа', err);
            dispatch({ type: CREATE_ORDER_ERROR });
        });
    }
}