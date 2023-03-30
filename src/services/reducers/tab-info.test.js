import {
    SET_TAB
} from "../actions/tab-info";
import { SAUCE } from '../../utils/dataNames';

import { tabInfoReducer, initialState } from "./tab-info";


describe('tab-info reducer', () => {
    it("should return the initial state", () => {
        expect(tabInfoReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle SET_TAB", () => {
        expect(tabInfoReducer(initialState, { type: SET_TAB, tab: SAUCE }))
            .toEqual({ ...initialState, tab: SAUCE });
    });
});