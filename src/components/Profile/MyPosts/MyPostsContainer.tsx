import React from "react";
import {actions} from "../../../redux/profile_reducer";
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux_store";


let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.ProfilePage.posts
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType,{}, AppStateType>(mapStateToProps,{
    addPosts: actions.addPostActionCreator
}) (MyPosts);

export default MyPostsContainer