import {authentication} from "./auth_reducer";
import {InferActionsType} from "./redux_store";

let initialState = {
    initialized: false,
}
export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: ActionsType): initialStateType  => {

    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}


export const initializeApp = () => (dispatch: any) => {
    let prom = dispatch(authentication());

    Promise.all([prom])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

/*export const initializeApp = () => async (dispatch) => {
    await dispatch(authentication());
    dispatch(initializedSuccess());
};*/

export default appReducer