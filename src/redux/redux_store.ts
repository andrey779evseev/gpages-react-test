import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import sidebarReducer from "./sidebar_reducer";
import usersReducer from "./users_reducer";
import authReducer from "./auth_reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app_reducer";

let RootReducer = combineReducers({
    ProfilePage: profileReducer,
    DialogsPage: dialogsReducer,
    Sidebar: sidebarReducer,
    UsersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsType<T> = T extends {[key: string] : (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));


export default store;