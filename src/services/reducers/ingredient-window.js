import { SET_DISPLAYED_INGREDIENT } from '../actions/ingredient-window';

const initialState = {
    displayedIngredient: null
}

export function ingredientWindowReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DISPLAYED_INGREDIENT:
            return { ...state, displayedIngredient: action.item };
        default:
            return state;
    }
}
