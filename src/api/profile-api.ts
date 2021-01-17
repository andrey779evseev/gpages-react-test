import {instance, ResponsesType} from "./api";
import {PhotosType ,ProfileType} from "../types/types";

type SavePhotosType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance.put<ResponsesType>(`profile/status`, {status: status}).then(response => response.data)
    },
    updateUserPhoto(file: any) {
        const formData = new FormData();
        formData.append("image", file)
        return instance.put<ResponsesType<SavePhotosType>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponsesType>(`/profile`, profile).then(response => response.data);
    }
}