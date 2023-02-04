import { v4 as uuid } from 'uuid';

export const SET_BUN = "SET_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SWAP_INGREDIENTS = "SWAP_INGREDIENTS";
export const SET_SUM = "SET_SUM";

export function addIngredient(item) {
    return {
        type: ADD_INGREDIENT,
        item: {...item, id: uuid()}
    }
}

