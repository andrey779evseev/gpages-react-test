import React, {FC} from "react";
import s from "./../Dialogs.module.css";

type PropsType = {
    text: string
}

const Message: FC<PropsType> = (props) => {
    return (
        <div className={s.mava}>
            <img className={s.item}
                 src="https://f0.pngfuel.com/png/701/23/black-and-brown-gorilla-vector-illustration-png-clip-art.png"/>

            <div className={s.message}>{props.text}</div>
        </div>
    )
}

export default Message