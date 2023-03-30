import { TIngredient } from '../../utils/types';
import { 
    LOAD_DATA_START, 
    LOAD_DATA_SUCCESS, 
    LOAD_DATA_ERROR,
    TLoadIngredientsActions
} from '../actions/load-ingredients';

type TLoadIngredientsState = {
    dataLoading: boolean;
    dataHasErrors: boolean;
    data: Array<TIngredient>;
}

export const initialState: TLoadIngredientsState = {
    dataLoading: false,
    dataHasErrors: false,
    data: []
}

export function loadIngredientsReducer(state = initialState, action: TLoadIngredientsActions) {
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
