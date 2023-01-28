import { 
    CREATE_ORDER_START, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_ERROR, 
    CLEAR_ORDER
} from '../actions/create-order';

const initialState = {
    orderLoading: false,
    orderHasErrors: false,
    orderNumber: null
}

export function createOrderReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ORDER_START:
            return { ...state, orderLoading: true, orderHasErrors: false };
        case CREATE_ORDER_SUCCESS:
            return { ...state, orderLoading: false, orderHasErrors: false, orderNumber: action.orderNumber };
        case CREATE_ORDER_ERROR:
            return { ...state, orderLoading: false, orderHasErrors: true, orderNumber: initialState.orderNumber };
        case CLEAR_ORDER:
            return initialState;
            
        default:
            return state;
    }
}
