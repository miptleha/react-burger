import { combineReducers } from 'redux';
import { loadIngredientsReducer } from './load-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientWindowReducer } from './ingredient-window';
import { createOrderReducer } from './create-order';
import { tabInfoReducer } from './tab-info';
import { authReducer } from './auth';
import { ordersAllReducer } from './orders-all';
import { ordersUserReducer } from './orders-user';
import { getOrderReducer } from './get-order';

export default combineReducers({
    loadIngredients: loadIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientWindow: ingredientWindowReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    tabInfo: tabInfoReducer,
    auth: authReducer,
    ordersAll: ordersAllReducer,
    ordersUser: ordersUserReducer
});