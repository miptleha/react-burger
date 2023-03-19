import { TOrdersList } from '../../utils/types';

export const ORDERS_ALL_START = "ORDERS_ALL_START";
export const ORDERS_ALL_OPEN = "ORDERS_ALL_OPEN";
export const ORDERS_ALL_END = "ORDERS_ALL_END";
export const ORDERS_ALL_SUCCESS = "ORDERS_ALL_SUCCESS";
export const ORDERS_ALL_ERROR = "ORDERS_ALL_ERROR";
export const ORDERS_ALL_CLOSED = "ORDERS_ALL_CLOSED";
export const ORDERS_ALL_MESSAGE = "ORDERS_ALL_MESSAGE";

export interface IOrdersAllStartAction {
    readonly type: typeof ORDERS_ALL_START;
    readonly url: string;
}

export interface IOrdersAllOpenAction {
    readonly type: typeof ORDERS_ALL_OPEN;
}

export interface IOrdersAllEndAction {
    readonly type: typeof ORDERS_ALL_END;
}

export interface IOrdersAllSuccessAction {
    readonly type: typeof ORDERS_ALL_SUCCESS;
}

export interface IOrdersAllErrorAction {
    readonly type: typeof ORDERS_ALL_ERROR;
    readonly error: string;
}

export interface IOrdersAllClosedAction {
    readonly type: typeof ORDERS_ALL_CLOSED;
}

export interface IOrdersAllMessageAction {
    readonly type: typeof ORDERS_ALL_MESSAGE;
    readonly message: TOrdersList;
}


export type TOrdersAllActions = 
    IOrdersAllStartAction | IOrdersAllOpenAction | IOrdersAllEndAction | IOrdersAllSuccessAction |
    IOrdersAllErrorAction | IOrdersAllClosedAction | IOrdersAllMessageAction;

export type TwsOrdersAllActions = {
    onStart: typeof ORDERS_ALL_START,
    onOpen: typeof ORDERS_ALL_OPEN,
    onSuccess: typeof ORDERS_ALL_SUCCESS,
    onClosed: typeof ORDERS_ALL_CLOSED,
    onDisconnect: typeof ORDERS_ALL_END,
    onError: typeof ORDERS_ALL_ERROR,
    onMessage: typeof ORDERS_ALL_MESSAGE
};

export const wsOrdersAllActions: TwsOrdersAllActions = {
    onStart: ORDERS_ALL_START,
    onOpen: ORDERS_ALL_OPEN,
    onSuccess: ORDERS_ALL_SUCCESS,
    onClosed: ORDERS_ALL_CLOSED,
    onDisconnect: ORDERS_ALL_END,
    onError: ORDERS_ALL_ERROR,
    onMessage: ORDERS_ALL_MESSAGE
}; 