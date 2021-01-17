import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from "./ProfileInfo.module.css";


type MapPropsType = {
    status: string
}
type DispatchPropsType = {
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<MapPropsType & DispatchPropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)


    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activatedMode = () => {
        setEditMode(true)
    }

    const deactivatedMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={s.status}>
            {!editMode ?
                <div onDoubleClick={activatedMode}>
                    <span>Status : {!props.status ? "нет статуса" : props.status}</span>
                </div>
                : <div>
                    <input autoFocus={true}
                           className={s.status_inp}
                           onBlur={deactivatedMode}
                           onChange={onStatusChange}
                           value={status}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks