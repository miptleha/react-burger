import { BUN } from '../../utils/dataNames';
import { SET_TAB, TTabInfoActions } from '../actions/tab-info';

type TTabInfoState = {
    tab: string;
}

export const initialState: TTabInfoState = {
    tab: BUN
}

export function tabInfoReducer(state = initialState, action: TTabInfoActions): TTabInfoState {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}
