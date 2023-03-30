import {
    ORDERS_ALL_SUCCESS,
    ORDERS_ALL_ERROR,
    ORDERS_ALL_CLOSED,
    ORDERS_ALL_MESSAGE
} from "../actions/orders-all";

import { ordersAllReducer, initialState } from "./orders-all";

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

describe('orders-all reducer', () => {
    it("should return the initial state", () => {
        expect(ordersAllReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle ORDERS_ALL_SUCCESS", () => {
        expect(ordersAllReducer(initialState, { type: ORDERS_ALL_SUCCESS }))
            .toEqual({ ...initialState, error: null, connected: true });
    });

    it("should handle ORDERS_ALL_ERROR", () => {
        expect(ordersAllReducer(initialState, { type: ORDERS_ALL_ERROR, error: errorMessage }))
            .toEqual({ ...initialState, error: errorMessage });
    });

    it("should handle ORDERS_ALL_CLOSED", () => {
        expect(ordersAllReducer(initialState, { type: ORDERS_ALL_CLOSED }))
            .toEqual({ ...initialState, error: null, connected: false });
    });

    it("should handle ORDERS_ALL_MESSAGE", () => {
        expect(ordersAllReducer(initialState, { type: ORDERS_ALL_MESSAGE, message: message }))
            .toEqual({ ...initialState, error: null, message: message });
    });
});