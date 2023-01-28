import { 
    LOAD_DATA_START, 
    LOAD_DATA_SUCCESS, 
    LOAD_DATA_ERROR
} from '../actions/load-ingredients';

const initialState = {
    dataLoading: false,
    dataHasErrors: false,
    data: []
}

export function loadIngredientsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA_START:
            return { ...state, dataLoading: true, dataHasErrors: false };
        case LOAD_DATA_SUCCESS:
            return { ...state, dataLoading: false, dataHasErrors: false, data: action.data };
        case LOAD_DATA_ERROR:
            return { ...state, dataLoading: false, dataHasErrors: true, data: initialState.data };
            
        default:
            return state;
    }
}
