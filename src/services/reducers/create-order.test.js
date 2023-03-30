import { 
    CREATE_ORDER_START, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_ERROR
} from "../actions/create-order";
    
import { createOrderReducer, initialState } from "./create-order";

const errorMessage = 'fail message';

describe('create-order reducer', () => {
    it("should return the initial state", () => {
        expect(createOrderReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle CREATE_ORDER_START", () => {
        expect(createOrderReducer(initialState, { type: CREATE_ORDER_START }))
            .toEqual({ ...initialState, orderLoading: true, orderHasErrors: false });
    });
    it("should handle CREATE_ORDER_SUCCESS", () => {
        const orderNumber = 1234;
        expect(createOrderReducer(initialState, { type: CREATE_ORDER_SUCCESS, orderNumber: orderNumber }))
            .toEqual({ ...initialState, orderLoading: false, orderHasErrors: false, orderNumber: orderNumber });
    });
    it("should handle CREATE_ORDER_ERROR", () => {
        expect(createOrderReducer(initialState, { type: CREATE_ORDER_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, orderLoading: false, orderHasErrors: true, orderNumber: null });
    });
});