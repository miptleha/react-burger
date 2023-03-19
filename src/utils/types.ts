import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TAuthActions } from "../services/actions/auth";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TCreateOrderActions } from "../services/actions/create-order";
import { TGetOrderActions } from "../services/actions/get-order";
import { TIngredientWindowActions } from "../services/actions/ingredient-window";
import { TLoadIngredientsActions } from "../services/actions/load-ingredients";
import { TOrdersAllActions, TwsOrdersAllActions } from "../services/actions/orders-all";
import { TOrdersUserActions, TwsOrdersUserActions } from "../services/actions/orders-user";
import { TTabInfoActions } from "../services/actions/tab-info";
import store from "../services/store";

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export type TIngredientConstructor = TIngredient & {
    id: string;
};

export type TUser = {
    name: string;
    email: string;
};

export type TRegisterUser = TUser & {
    password: string;
};

export type TLoginUser = {
    email: string;
    password: string;
};

export type TForgotPassword = {
    email: string;
};

export type TSubmit = {
    wasSubmit?: boolean;
};

export type TResetPassword = {
    password: string;
    token: string;
};

export type TPatchUser = TUser & {
    password: string;
};

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TOrdersList = {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
}

export type RootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;

export type TApplicationActions = TAuthActions | TBurgerConstructorActions | TCreateOrderActions | 
    TIngredientWindowActions | TLoadIngredientsActions | TTabInfoActions | 
    TOrdersAllActions | TOrdersUserActions | TGetOrderActions;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;

export type wsActionsTypes = TwsOrdersAllActions | TwsOrdersUserActions;