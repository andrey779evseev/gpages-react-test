import React, {FC} from "react";
import s from "./Users.module.css";
import userPhotos from "../../assets/images/ava.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
import {Button} from "antd";



type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {



    return <div>
                    <div className={s.flex_wrapper}>
                        <div className={s.avafoll}>
                            <NavLink to={'/profile/' + user.id} className={s.avaAllign} >
                                <img alt='ava' className={s.ava}
                                     src={user.photos.small != null ? user.photos.small : userPhotos}/>
                            </NavLink>
                            <br/>
                            {user.followed ?
                                <Button type={'primary'} disabled={followingInProgress.some(id => id === user.id)}   onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</Button>
                                : <Button type={'primary'} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id)
                                }}>Follow</Button>}
                        </div>

                        <div className={s.description}>
                            <div><span className={s.name}>{user.name}</span>
                                <p className={s.status}>{user.status}</p></div>
                            <span className={s.location}> {"user.location.country"}<br/>{"user.location.city"}</span>
                        </div>
                    </div>
                </div>
}

export default User