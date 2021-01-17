import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux_store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>

export const withAuthRedirect = (Component: ComponentType) => {
    class RedirectComponent extends React.Component<MapStatePropsType> {
        render() {
            if (!this.props.isAuth ) return <Redirect to={"/login"}/>;

            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

