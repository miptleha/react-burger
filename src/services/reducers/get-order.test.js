import { 
    GET_ORDER_START, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_ERROR
} from "../actions/get-order";
    
import { getOrderReducer, initialState } from "./get-order";

const errorMessage = 'fail message';

describe('get-order reducer', () => {
    it("should return the initial state", () => {
        expect(getOrderReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle GET_ORDER_START", () => {
        expect(getOrderReducer(initialState, { type: GET_ORDER_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null });
    });
    it("should handle GET_ORDER_SUCCESS", () => {
        const order = 1234;
        expect(getOrderReducer(initialState, { type: GET_ORDER_SUCCESS, order: order }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, order: order });
    });
    it("should handle GET_ORDER_ERROR", () => {
        expect(getOrderReducer(initialState, { type: GET_ORDER_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, order: null });
    });
});