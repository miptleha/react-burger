import { dataLoad } from '../../utils/api';

export const LOAD_DATA_START = "LOAD_DATA_START";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const LOAD_DATA_ERROR = "LOAD_DATA_ERROR";

export function loadIngredientsAction() {
    return function(dispatch) {
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
