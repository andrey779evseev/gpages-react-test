import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {BaseThunkType, InferActionsType} from "./redux_store";
import {securityAPI} from "../api/security-api";


let initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null// if null, then captcha is not required
}

type initialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionType | ReturnType<typeof stopSubmit>>
type ActionType = InferActionsType<typeof actions>


const authReducer = (state = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case 'malifor-network/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData : (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'malifor-network/auth/SET_USER_DATA', payload: {
            id,
            email,
            login,
            isAuth,
        }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const)
}


export const authentication = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}



export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(authentication())
    } else {
        if (data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;