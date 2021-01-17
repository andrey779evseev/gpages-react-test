import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsType} from "./redux_store";


type initialStateType = typeof initialState
let initialState = {
    posts: [
        {id: 1, message: 'What is your name?', likesCount: 12},
        {id: 2, message: 'My name is Andrew', likesCount: 24},
        {id: 3, message: 'Hi', likesCount: 15},
        {id: 4, message: 'Hi', likesCount: 2},
        {id: 5, message: 'My friend', likesCount: 6},
        {id: 6, message: 'Yes', likesCount: 19},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'ADD-POST': {
            let newPostText = action.newPostText
            return {
                ...state,
                posts: [{id: 9, message: newPostText, likesCount: 0}, ...state.posts],
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_USERS_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            }
        }
        case 'UPLOAD_PHOTO': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'ADD-POST', newPostText} as const),
    setUsersProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setUsersStatus: (status: string) => ({type: 'SET_USERS_STATUS', status} as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    setUserPhoto: (photos: PhotosType) => ({type: 'UPLOAD_PHOTO', photos} as const)
}

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUsersProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserStatus(userId)
    dispatch(actions.setUsersStatus(data))
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateUserStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setUsersStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateUserPhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.setUserPhoto(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0 && userId != null){
        dispatch(getUserProfile(userId))
    }
}




export default profileReducer;