import { dataLoad } from '../../utils/api';
import { AppDispatch, TIngredient } from '../../utils/types';

export const LOAD_DATA_START = "LOAD_DATA_START";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const LOAD_DATA_ERROR = "LOAD_DATA_ERROR";

export interface ILoadDataStartAction {
    type: typeof LOAD_DATA_START;
}

export interface ILoadDataSuccessAction {
    type: typeof LOAD_DATA_SUCCESS;
    data: Array<TIngredient>;
}

export interface ILoadDataErrorAction {
    type: typeof LOAD_DATA_ERROR;
}

export type TLoadIngredientsActions = ILoadDataStartAction | ILoadDataSuccessAction | ILoadDataErrorAction;

export function loadIngredientsAction() {
    return function(dispatch: AppDispatch) {
        dispatch({ type: LOAD_DATA_START });
        dataLoad()
        .then(result => {
            dispatch({ type: LOAD_DATA_SUCCESS, data: result.data });
        })
        .catch(err => {
            dispatch({ type: LOAD_DATA_ERROR });
        });
    }
}
