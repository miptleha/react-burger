export const SET_TAB = "SET_TAB";

export interface SetTabAction {
    type: typeof SET_TAB;
    tab: string;
}

export type TTabInfoActions = SetTabAction;