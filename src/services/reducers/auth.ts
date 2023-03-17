import { TUser } from '../../utils/types';
import {
    AUTH_REGISTER_START,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,

    AUTH_LOGIN_START,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,

    AUTH_LOGOUT_START,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_ERROR,

    AUTH_TOKEN_START,
    AUTH_TOKEN_SUCCESS,
    AUTH_TOKEN_ERROR,

    AUTH_FORGOT_PASSWORD_START,
    AUTH_FORGOT_PASSWORD_SUCCESS,
    AUTH_FORGOT_PASSWORD_ERROR,

    AUTH_RESET_PASSWORD_START,
    AUTH_RESET_PASSWORD_SUCCESS,
    AUTH_RESET_PASSWORD_ERROR,

    AUTH_GET_USER_START,
    AUTH_GET_USER_SUCCESS,
    AUTH_GET_USER_ERROR,

    AUTH_PATCH_USER_START,
    AUTH_PATCH_USER_SUCCESS,
    AUTH_PATCH_USER_ERROR,

    TAuthActions,
} from '../actions/auth';

type TAuthState = {
    requestStart: boolean;
    requestError: string | null;
    requestSuccess: boolean;
    userLoggedIn: boolean;
    user: TUser | null;
    forgotPassword: boolean;
}

const initialState: TAuthState = {
    requestStart: false,
    requestError: null,
    requestSuccess: false,
    userLoggedIn: false,
    user: null,
    forgotPassword: false
};

export function authReducer(state = initialState, action: TAuthActions): TAuthState {
    switch (action.type) {
        case AUTH_REGISTER_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_REGISTER_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: action.user };
        case AUTH_REGISTER_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false, userLoggedIn: false, user: null };

        case AUTH_LOGIN_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_LOGIN_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: action.user };
        case AUTH_LOGIN_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false, userLoggedIn: false, user: null };

        case AUTH_LOGOUT_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_LOGOUT_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: false, user: null };
        case AUTH_LOGOUT_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false, userLoggedIn: false, user: null };

        case AUTH_TOKEN_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_TOKEN_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: action.user };
        case AUTH_TOKEN_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false, userLoggedIn: false, user: null };

        case AUTH_FORGOT_PASSWORD_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false, forgotPassword: false };
        case AUTH_FORGOT_PASSWORD_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, forgotPassword: true };
        case AUTH_FORGOT_PASSWORD_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false, forgotPassword: false };

        case AUTH_RESET_PASSWORD_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_RESET_PASSWORD_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true };
        case AUTH_RESET_PASSWORD_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false };

        case AUTH_GET_USER_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_GET_USER_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: action.user };
        case AUTH_GET_USER_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false, userLoggedIn: false, user: null };

        case AUTH_PATCH_USER_START:
            return { ...state, requestStart: true, requestError: null, requestSuccess: false };
        case AUTH_PATCH_USER_SUCCESS:
            return { ...state, requestStart: false, requestError: null, requestSuccess: true, user: action.user };
        case AUTH_PATCH_USER_ERROR:
            return { ...state, requestStart: false, requestError: action.message, requestSuccess: false };

        default:
            return state;
    }
}