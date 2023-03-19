import { TOrdersList } from '../../utils/types';

export const ORDERS_USER_START = "ORDERS_USER_START";
export const ORDERS_USER_OPEN = "ORDERS_USER_OPEN";
export const ORDERS_USER_END = "ORDERS_USER_END";
export const ORDERS_USER_SUCCESS = "ORDERS_USER_SUCCESS";
export const ORDERS_USER_ERROR = "ORDERS_USER_ERROR";
export const ORDERS_USER_CLOSED = "ORDERS_USER_CLOSED";
export const ORDERS_USER_MESSAGE = "ORDERS_USER_MESSAGE";

export interface IOrdersUserStartAction {
    readonly type: typeof ORDERS_USER_START;
    readonly url: string;
}

export interface IOrdersUserOpenAction {
    readonly type: typeof ORDERS_USER_OPEN;
}

export interface IOrdersUserEndAction {
    readonly type: typeof ORDERS_USER_END;
}

export interface IOrdersUserSuccessAction {
    readonly type: typeof ORDERS_USER_SUCCESS;
}

export interface IOrdersUserErrorAction {
    readonly type: typeof ORDERS_USER_ERROR;
    readonly error: string;
}

export interface IOrdersUserClosedAction {
    readonly type: typeof ORDERS_USER_CLOSED;
}

export interface IOrdersUserMessageAction {
    readonly type: typeof ORDERS_USER_MESSAGE;
    readonly message: TOrdersList;
}


export type TOrdersUserActions =
    IOrdersUserStartAction | IOrdersUserOpenAction | IOrdersUserEndAction | IOrdersUserSuccessAction |
    IOrdersUserErrorAction | IOrdersUserClosedAction | IOrdersUserMessageAction;

export type TwsOrdersUserActions = {
    onStart: typeof ORDERS_USER_START,
    onOpen: typeof ORDERS_USER_OPEN,
    onSuccess: typeof ORDERS_USER_SUCCESS,
    onClosed: typeof ORDERS_USER_CLOSED,
    onDisconnect: typeof ORDERS_USER_END,
    onError: typeof ORDERS_USER_ERROR,
    onMessage: typeof ORDERS_USER_MESSAGE
}; 

export const wsOrdersUserActions: TwsOrdersUserActions = {
    onStart: ORDERS_USER_START,
    onOpen: ORDERS_USER_OPEN,
    onSuccess: ORDERS_USER_SUCCESS,
    onClosed: ORDERS_USER_CLOSED,
    onDisconnect: ORDERS_USER_END,
    onError: ORDERS_USER_ERROR,
    onMessage: ORDERS_USER_MESSAGE
}; 