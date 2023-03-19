import { RootState } from "../utils/types";

export const getData = (state: RootState) => state.loadIngredients;
export const getIngredients = (state: RootState) => state.burgerConstructor;
export const createOrder = (state: RootState) => state.createOrder;
export const getOrder = (state: RootState) => state.getOrder;
export const getDisplayedIngredient = (state: RootState) => state.ingredientWindow.displayedIngredient;
export const getTab = (state: RootState) => state.tabInfo.tab;
export const getAuth = (state: RootState) => state.auth;
export const getOrdersAll = (state: RootState) => state.ordersAll;
export const getOrdersUser = (state: RootState) => state.ordersUser;