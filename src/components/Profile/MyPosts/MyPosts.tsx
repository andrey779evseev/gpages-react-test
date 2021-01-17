import s from "./MyPosts.module.css";
import React, {FC} from "react";
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Textarea} from "../../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

const maxLength = maxLengthCreator(50)

type AddNewPostFormValuesTypes = {
    newPostText: string
}
type AddNewPostFormValuesTypesKeys = keyof AddNewPostFormValuesTypes

let AddNewPostForm: FC<InjectedFormProps<AddNewPostFormValuesTypes>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddNewPostFormValuesTypesKeys>("PostText", s.textar, "textarea", "newPostText", Textarea, [required, maxLength])}<br/>
            <button type="submit">Add Post</button>
        </form>
    )
}

const AddNewPostsForm = reduxForm<AddNewPostFormValuesTypes>({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export type MapStatePropsType = {
    posts: Array<PostType>
}

export type MapDispatchPropsType = {
    addPosts: (newPostText: string) => void
}

let MyPosts: FC<MapStatePropsType & MapDispatchPropsType> = React.memo(props => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>)


    let onAddPosts = (values: {newPostText: string}) => {
        props.addPosts(values.newPostText)
    }

    return <div>
        My posts
        <AddNewPostsForm onSubmit={onAddPosts}/>
        <div>
            {postsElements}
        </div>
    </div>
})


export default MyPosts