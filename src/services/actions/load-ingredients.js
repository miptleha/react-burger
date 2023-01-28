import { dataLoad } from '../../utils/dataLoad';

export const LOAD_DATA_START = "LOAD_DATA_START";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const LOAD_DATA_ERROR = "LOAD_DATA_ERROR";

export function loadIngredientsAction() {
    return function(dispatch) {
        dispatch({ type: LOAD_DATA_START });
        dataLoad()
        .then(data => {
            dispatch({ type: LOAD_DATA_SUCCESS, data: data });
        })
        .catch(err => {
            //console.log('ошибка получения ингредиентов', err);
            dispatch({ type: LOAD_DATA_ERROR });
        });
    }
}
