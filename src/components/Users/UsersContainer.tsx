import React, {FC} from "react";
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../../common/prelooader/Preloader";
import {isFetchingGet} from '../../redux/users_selectors';



type UsersPagePropsType = {}

const UsersPage: FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(isFetchingGet)


    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}

export default UsersPage