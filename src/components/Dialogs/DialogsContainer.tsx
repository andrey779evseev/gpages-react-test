import React, {ComponentType} from "react";
import {actions} from "../../redux/dialogs_reducer";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux_store";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.DialogsPage.dialogs,
        messages: state.DialogsPage.messages
    }
}

const DialogsContainer = compose<ComponentType>(
    connect(mapStateToProps, {addNewMessage: actions.addNewMessage}),
    withAuthRedirect
)(Dialogs)

export default DialogsContainer
