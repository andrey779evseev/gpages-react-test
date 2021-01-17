import {InferActionsType} from "./redux_store";


export type dialogType = {
    id: number
    name: string
}

export type messageType = {
    id: number
    message: string
}

let initialState = {
        dialogs: [
            {id: 1, name: 'Andrew'},
            {id: 2, name: 'Mark'},
            {id: 3, name: 'Victor'},
            {id: 4, name: 'Vasia'},
            {id: 5, name: 'Sasha'},
            {id: 6, name: 'Petya'},
        ] as Array<dialogType>,
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'My name is Andrew'},
            {id: 3, message: 'Hi, me name is Vasia'},
            {id: 4, message: 'Yes'},
            {id: 5, message: 'No'},
            {id: 6, message: 'My friend'},
            {id: 7, message: 'Yes'},
            {id: 8, message: 'Yo'},
        ] as Array<messageType>,
}

export type initialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>



const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'ADD-MESSAGE': {
            let newMessageBody = action.newMessageBody
            return  {
                ...state,
                messages: [{id: 9, message: newMessageBody}, ...state.messages],
            }
        }
        default:
            return state;
    }
}



export const actions = {
    addNewMessage : (newMessageBody: string) => ({type:'ADD-MESSAGE', newMessageBody} as const)
}




export default dialogsReducer;