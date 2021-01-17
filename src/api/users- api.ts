import {GetItemsType, instance, ResponsesType} from "./api";
import {FilterType} from '../redux/users_reducer';

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, filter: FilterType) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}` + (filter.friend === null ? '' : `&friend=${filter.friend}`)
        ).then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponsesType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponsesType>(`follow/${userId}`).then(response => response.data)
    },
}