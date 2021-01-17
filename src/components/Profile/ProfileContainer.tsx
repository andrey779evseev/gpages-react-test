import React, {ComponentType, FC, useEffect} from "react";
import Profile from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, getUserStatus} from "../../redux/profile_reducer";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {AppStateType} from "../../redux/redux_store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type PathParamsType = {
    userId: string
}

const ProfileContainer: FC<RouteComponentProps<PathParamsType>> = (props) => {
    const id = useSelector((state: AppStateType) => state.auth.id)

    const dispatch = useDispatch()

    const refreshProfile = () => {
        let userId: number | null = +props.match.params.userId
        if (!userId) {
            userId = id
            if (!userId) {
                props.history.push("/login")
            }
        }

        dispatch(getUserProfile(userId as number))
        dispatch(getUserStatus(userId as number))
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    useEffect(() => {
        refreshProfile()
    }, [id])

    return (
        <div>
            <Profile {...props}
                     isOwner={!props.match.params.userId}/>
        </div>
    )
}


export default compose<ComponentType>(
    withRouter,
    withAuthRedirect
)(ProfileContainer)
