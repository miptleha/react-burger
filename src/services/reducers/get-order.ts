import { TOrder } from '../../utils/types';
import { 
    GET_ORDER_START, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_ERROR, 
    TGetOrderActions
} from '../actions/get-order';

type TGetOrderState = {
    requestStart: boolean;
    requestError: string | null;
    order: TOrder | null;
}

const initialState : TGetOrderState = {
    requestStart: false,
    requestError: null,
    order: null
}

export function getOrderReducer(state = initialState, action: TGetOrderActions): TGetOrderState {
    switch (action.type) {
        case GET_ORDER_START:
            return { ...state, requestStart: true, requestError: null };
        case GET_ORDER_SUCCESS:
            return { ...state, requestStart: false, requestError: null, order: action.order };
        case GET_ORDER_ERROR:
            return { ...state, requestStart: false, requestError: action.message, order: null };
            
        default:
            return state;
    }
}
