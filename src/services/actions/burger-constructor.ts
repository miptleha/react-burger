import { v4 as uuid } from 'uuid';
import { TIngredient, TIngredientConstructor } from '../../utils/types';

export const SET_BUN = "SET_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SWAP_INGREDIENTS = "SWAP_INGREDIENTS";
export const SET_SUM = "SET_SUM";

export interface SetBunAction {
    type: typeof SET_BUN;
    item: TIngredient;
}

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    item: TIngredientConstructor;
}

export interface DeleteIngredientAction {
    type: typeof DELETE_INGREDIENT;
    index: number;
}

export interface SwapIngredientAction {
    type: typeof SWAP_INGREDIENTS;
    index1: number;
    index2: number;
}

export interface SetSumAction {
    type: typeof SET_SUM;
    sum: number;
}

export type TBurgerConstructorActions = SetBunAction | AddIngredientAction | DeleteIngredientAction | 
    SwapIngredientAction | SetSumAction;

export function addIngredient(item: TIngredient): AddIngredientAction {
    return {
        type: ADD_INGREDIENT,
        item: {...item, id: uuid()}
    }
}

