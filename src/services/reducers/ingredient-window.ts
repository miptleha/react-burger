import { TIngredient } from '../../utils/types';
import { SET_DISPLAYED_INGREDIENT, TIngredientWindowActions } from '../actions/ingredient-window';

type TIngredientWindowsState = {
    displayedIngredient: TIngredient | null;
}

const initialState: TIngredientWindowsState = {
    displayedIngredient: null
}

export function ingredientWindowReducer(state = initialState, action: TIngredientWindowActions): TIngredientWindowsState {
    switch (action.type) {
        case SET_DISPLAYED_INGREDIENT:
            return { ...state, displayedIngredient: action.item };
        default:
            return state;
    }
}
