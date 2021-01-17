import {createSelector} from "reselect";
import { AppStateType } from "./redux_store";

const usersGetStupid = (state: AppStateType) => {
    return state.UsersPage.users
}

export const usersGet = createSelector( usersGetStupid, (users) =>  {
    return users;
})

export const pageSizeGet = (state: AppStateType) => {
    return state.UsersPage.pageSize
}

export const totalUsersCountGet = (state: AppStateType) => {
    return state.UsersPage.totalUsersCount
}

export const currentPageGet = (state: AppStateType) => {
    return state.UsersPage.currentPage
}

export const isFetchingGet = (state: AppStateType) => {
    return state.UsersPage.isFetching
}

export const followingInProgressGet = (state: AppStateType) => {
    return state.UsersPage.followingInProgress
}

export const getUsersFilterGet = (state: AppStateType) => {
    return state.UsersPage.filter
}
