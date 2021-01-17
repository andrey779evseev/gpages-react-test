import s from "./Post.module.css";
import React, {FC} from "react";

type PropsType = {
    message: string
    likesCount: number
}

const Post: FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://i.stack.imgur.com/rRslI.png?s=328&g=1"/>
            {props.message}

            <div className={s.like}>
                <button className={s.likeActive}> ♥</button>
                {props.likesCount}
            </div>

        </div>)
}

export default Post