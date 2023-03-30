import {
    ORDERS_USER_SUCCESS,
    ORDERS_USER_ERROR,
    ORDERS_USER_CLOSED,
    ORDERS_USER_MESSAGE
} from "../actions/orders-user";

import { ordersUserReducer, initialState } from "./orders-user";

const errorMessage = 'fail message';

const message = {
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3463f7034a000269f45e7",
                "60d3463f7034a000269f45e9",
                "60d3463f7034a000269f45e8",
                "60d3463f7034a000269f45ea"
            ],
            "_id": "",
            "status": "done",
            "number": 0,
            "createdAt": "2021-06-23T14:43:22.587Z",
            "updatedAt": "2021-06-23T14:43:22.603Z"
        }
    ],
    "total": 1,
    "totalToday": 1
};

describe('orders-user reducer', () => {
    it("should return the initial state", () => {
        expect(ordersUserReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle ORDERS_USER_SUCCESS", () => {
        expect(ordersUserReducer(initialState, { type: ORDERS_USER_SUCCESS }))
            .toEqual({ ...initialState, error: null, connected: true });
    });

    it("should handle ORDERS_USER_ERROR", () => {
        expect(ordersUserReducer(initialState, { type: ORDERS_USER_ERROR, error: errorMessage }))
            .toEqual({ ...initialState, error: errorMessage });
    });

    it("should handle ORDERS_USER_CLOSED", () => {
        expect(ordersUserReducer(initialState, { type: ORDERS_USER_CLOSED }))
            .toEqual({ ...initialState, error: null, connected: false });
    });

    it("should handle ORDERS_USER_MESSAGE", () => {
        expect(ordersUserReducer(initialState, { type: ORDERS_USER_MESSAGE, message: message }))
            .toEqual({ ...initialState, error: null, message: message });
    });
});