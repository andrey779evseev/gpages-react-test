import React, {ChangeEvent} from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
    status: string
    updateUserStatus: (newStatus:string) => void

}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode : true,
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode : false,
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }

    }

    render() {



        return (
            <div className={s.status}>
                {!this.state.editMode ?
                    <div >
                        <p >Status : <span onDoubleClick={this.activateEditMode}>{!this.props.status ? "нет статуса" : this.props.status}</span></p>
                    </div>
                    : <div >
                        <input autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               onChange={this.onStatusChange}
                               className={s.status_inp}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus