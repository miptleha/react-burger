import { 
    LOAD_DATA_START, 
    LOAD_DATA_SUCCESS, 
    LOAD_DATA_ERROR
} from "../actions/load-ingredients";
    
import { loadIngredientsReducer, initialState } from "./load-ingredients";

const errorMessage = 'fail message';

const data = [
    {
        "_id": "60666c42cc7b410027a1a9b6",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    },
    {
        "_id": "60666c42cc7b410027a1a9b7",
        "name": "Соус Spicy-X",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    }
];

describe('load-ingredients reducer', () => {
    it("should return the initial state", () => {
        expect(loadIngredientsReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle LOAD_DATA_START", () => {
        expect(loadIngredientsReducer(initialState, { type: LOAD_DATA_START }))
            .toEqual({ ...initialState, dataLoading: true, dataHasErrors: false });
    });
    it("should handle LOAD_DATA_SUCCESS", () => {
        expect(loadIngredientsReducer(initialState, { type: LOAD_DATA_SUCCESS, data: data }))
            .toEqual({ ...initialState, dataLoading: false, dataHasErrors: false, data: data });
    });
    it("should handle LOAD_DATA_ERROR", () => {
        expect(loadIngredientsReducer(initialState, { type: LOAD_DATA_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, dataLoading: false, dataHasErrors: true, data: [] });
    });
});