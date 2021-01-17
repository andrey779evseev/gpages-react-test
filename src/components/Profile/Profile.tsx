import React, {FC} from "react";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


type MapPropsType = {
    isOwner: boolean
}



const Profile: FC<MapPropsType> = (props) => {
    return (
        <div className={s.bodydiv}>
            <div>
                <img width="100%" className={s.item}
                     src="https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1959&q=80"/>
            </div>
            <div className={s.profile}>

                <ProfileInfo isOwner={props.isOwner}/>

                <MyPostsContainer />
            </div>
        </div>
    )
}

export default Profile