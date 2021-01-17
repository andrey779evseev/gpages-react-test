import Spinner from "../../assets/images/Spinner.svg";
import React, {FC} from "react";
import s from "./Preloader.module.css"

let Preloader: FC = () => {
    return <div>
        <img src={Spinner} className={s.preloader}/>
    </div>
}

export default Preloader