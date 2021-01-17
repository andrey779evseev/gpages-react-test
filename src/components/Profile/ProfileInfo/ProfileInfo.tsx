import s from "./ProfileInfo.module.css";
import React, {ChangeEvent, FC, useState} from "react";
import Preloader from "../../../common/prelooader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux_store";
import {savePhoto, saveProfile, updateUserStatus} from "../../../redux/profile_reducer";
import {ProfileType} from "../../../types/types";
import {Button} from "antd";
import {Form, Formik} from "formik";
import {Checkbox, Input} from "formik-antd";

type MapStatePropsType = {
    isOwner: boolean
}
const ProfileInfo: FC<MapStatePropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)

    const profile = useSelector((state: AppStateType) => state.ProfilePage.profile) as ProfileType
    const status = useSelector((state: AppStateType) => state.ProfilePage.status)

    const dispatch = useDispatch()

    const updateUserStatusF = (status: string) => {
        dispatch(updateUserStatus(status))
    }

    const savePhotoF = (photo: File) => {
        dispatch(savePhoto(photo))
    }

    const saveProfileF = async (formData: ProfileType) => {
        await dispatch(saveProfile(formData))
        setEditMode(false)
    }

    if (!profile) {
        return <Preloader/>
    }


    const uploadMyMainPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length)
            savePhotoF(e.target.files[0])
    }

    return (
        <div className={s.wrapper}>
            <div>
                <img className={s.ava}
                     src={!profile.photos.large ? "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" : profile.photos.large}/><br/>
                {props.isOwner && <input className={s.uploadPhoto} onChange={uploadMyMainPhoto} type={"file"}/>}
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatusF}/>
                {editMode ? <ProfileDataForm  profile={profile} saveProfileF={saveProfileF}/> :
                    <ProfileData profile={profile} setEditMode={setEditMode} isOwner={props.isOwner}
                                 editMode={editMode}/>}
            </div>

        </div>

    )
}

const ProfileDataForm = (props: { saveProfileF: (profile: ProfileType) => void , profile: ProfileType}) => {

    return <Formik
        initialValues={props.profile}
        onSubmit={(values: ProfileType) => {
            props.saveProfileF(values)
        }}
    >
        {(props: any) => {
            return (
            <Form onSubmit={props.handleSubmit}>
                <Button htmlType="submit" type="ghost">Save</Button>
                <Input placeholder="FullName" name="fullName" onChange={props.handleChange}
                       value={props.values.fullName}/>
                <Input placeholder="AboutMe" name="aboutMe" onChange={props.handleChange} value={props.values.aboutMe}/>
                <Checkbox name="lookingForAJob" value={props.values.lookingForAJob}>lookingForAJob</Checkbox>
                <Input placeholder="lookingForAJobDescription" name="lookingForAJobDescription"
                       onChange={props.handleChange} value={props.values.lookingForAJobDescription}/>
                <div>
                    <b>Contacts</b>: {Object.keys(props.values.contacts).map(key => {
                    return <div key={key} >
                        <b>{key}: <Input name={"contacts." + key} value={props.values.contacts[key]} placeholder={key}/></b>
                    </div>})}
                </div>

            </Form>
        )}}
    </Formik>
}


const ProfileData = (props: { profile: ProfileType, isOwner: boolean, editMode: boolean, setEditMode: (val: boolean) => void }) => {
    return <div style={{marginLeft: 20}}>
        {props.isOwner && !props.editMode &&
        <Button type={"ghost"} onClick={() => props.setEditMode(true)} color={"red"}>Edit</Button>}
        <h2 style={{marginLeft: 0}}>{props.profile.fullName}</h2>
        <p>looking for a job : {props.profile.lookingForAJob ? "yes" : "no"}</p>
        <p>looking for a job description : {props.profile.lookingForAJobDescription}</p>
        <div>
            <h3>Contacts</h3>
            <div style={{marginLeft: 20}}>
                {Object.keys(props.profile.contacts).map((key: any) => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}
            </div>

        </div>
    </div>
}


type PropsTypes = {
    contactTitle: string
    contactValue: string
}

const Contact: FC<PropsTypes> = ({contactTitle, contactValue}) => {
    return <p>{contactTitle}: {contactValue ? <a href={contactValue} target="_blank" style={{color: 'green'}}>{contactValue}</a> : <span style={{color: 'red'}}>нету</span>}</p>
}

export default ProfileInfo