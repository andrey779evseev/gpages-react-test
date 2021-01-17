import React, {FC} from "react";
import s from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    id :number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    return <div className={s.dialog}>
        <img src="https://rezoleg.ru/images/avatar/1_ULYowpbnr0VtDEqJ6P7tfQ.png" className={s.item}/>
        <NavLink to={"/dialog/" + props.id} activeClassName={s.active}>{props.name}</NavLink>
    </div>
}

export default DialogItem