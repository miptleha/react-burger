import { TIngredient } from '../../utils/types';

export const SET_DISPLAYED_INGREDIENT = "SET_DISPLAYED_INGREDIENT";

export interface SetDisplayedIngredientAction {
    type: typeof SET_DISPLAYED_INGREDIENT;
    item: TIngredient | null;
}

export type TIngredientWindowActions = SetDisplayedIngredientAction;
