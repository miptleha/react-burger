import { RootState } from "../utils/types";

export const getData = (state: RootState) => state.loadIngredients;
export const getIngredients = (state: RootState) => state.burgerConstructor;
export const getOrder = (state: RootState) => state.createOrder;
export const getDisplayedIngredient = (state: RootState) => state.ingredientWindow.displayedIngredient;
export const getTab = (state: RootState) => state.tabInfo.tab;
export const getAuth = (state: RootState) => state.auth;