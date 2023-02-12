import { orderCreate } from '../../utils/api';

export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function createOrderAction(ingredients) {
    return function(dispatch) {
        dispatch({ type: CREATE_ORDER_START });
        orderCreate(ingredients)
        .then(result => {
            dispatch({ type: CREATE_ORDER_SUCCESS, orderNumber: result.order.number });
        })
        .catch(err => {
            dispatch({ type: CREATE_ORDER_ERROR });
        });
    }
}