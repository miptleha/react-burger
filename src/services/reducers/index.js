import { combineReducers } from 'redux';
import { loadIngredientsReducer } from './load-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { ingredientWindowReducer } from './ingredient-window';
import { createOrderReducer } from './create-order';
import { tabInfoReducer } from './tab-info';

export default combineReducers({
    loadIngredients: loadIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientWindow: ingredientWindowReducer,
    createOrder: createOrderReducer,
    tabInfo: tabInfoReducer
});