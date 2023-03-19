import { orderCreate } from '../../utils/api';
import { AppDispatch, TIngredient } from '../../utils/types';

export const CREATE_ORDER_START = "CREATE_ORDER_START";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export interface ICreateOrderStartAction {
    type: typeof CREATE_ORDER_START;
}

export interface ICreateOrderSuccessAction {
    type: typeof CREATE_ORDER_SUCCESS;
    orderNumber: number;
}

export interface ICreateOrderErrorAction {
    type: typeof CREATE_ORDER_ERROR;
}

export interface IClearOrderAction {
    type: typeof CLEAR_ORDER;
}

export type TCreateOrderActions = ICreateOrderStartAction | ICreateOrderSuccessAction | ICreateOrderErrorAction | 
    IClearOrderAction;

export function createOrderAction(ingredients: Array<TIngredient>) {
    return function(dispatch: AppDispatch) {
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