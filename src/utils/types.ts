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
    index: number;
};

export type TRegisterUser = {
    name: string;
    email: string;
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

export type TPatchUser = {
    name: string;
    email: string;
    password: string;
};