import React, {FC} from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {dialogType, messageType} from "../../redux/dialogs_reducer";
import {createField, Textarea} from "../../common/FormsControls/FormsControls";


type MapStatePropsType = {
    dialogs: Array<dialogType>
    messages: Array<messageType>
}
type MapDispatchPropsType = {
    addNewMessage: (newMessageBody: string) => void
}

type newMessageFormDataType = {
    newMessageBody: string
}

type newMessageFormDataTypeKeys = keyof newMessageFormDataType


const maxLength = maxLengthCreator(30)

let AddMessageForm: FC<InjectedFormProps<newMessageFormDataType>> = (props) => {
    return (
        <form className={s.clearfix} onSubmit={props.handleSubmit}>
            <button type="submit" className={s.clip}>&#128206;</button>
            <div>
               {createField<newMessageFormDataTypeKeys>("Enter your message", s.textar, "textarea", "newMessageBody", Textarea, [required, maxLength])}
            </div>

            <button type="submit" className={s.forward}>&#8594;</button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm<newMessageFormDataType>({form: "dialogAddMessageForm"})(AddMessageForm)

const Dialogs: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)

    let messagesElements = props.messages.map(m => <Message text={m.message} key={m.id}/>)


    let addNewMessage = (values: {newMessageBody: string}) => {
        props.addNewMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.vl}></div>

            <div className={s.messages}>
                {messagesElements}


            </div>
            <footer className={s.footer}>
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </footer>

        </div>
    )
}


export default Dialogs