import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    headers : {
        "API-KEY" : "91cf8020-06af-48f1-9986-c7ac90bd7f5a"
    },
    baseURL : "https://social-network.samuraijs.com/api/1.0/"
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export type ResponsesType<D={}> = {
    data: D
    resultCode: ResultCodesEnum
    messages: Array<string>
}