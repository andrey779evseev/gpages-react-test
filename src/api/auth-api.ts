import {instance, ResponsesType, ResultCodesEnum} from "./api";



type MeResponseDataType = {
        id: number
        email: string
        login: string
}
type LoginResponseDataType = {
    data: {
        id: number
    }
}
export const authAPI = {
    me() {
        return instance.get<ResponsesType<MeResponseDataType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponsesType<LoginResponseDataType>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete(`auth/login`).then(response => response.data)
    }
}