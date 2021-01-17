import {Avatar, Button, Col, Row} from "antd";
import React, {Ref, useEffect, useRef, useState} from "react";
import {FC} from "react";
import TextArea from "antd/es/input/TextArea";
import Preloader from "../../common/prelooader/Preloader";


type MessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


export const ChatPage: FC = () => {


    return <div>
        <Chat/>
    </div>
}

const Chat = () => {
    const [ws, setWs] = useState<WebSocket | null>(null)


    useEffect(() => {
        let wsTemp: WebSocket
        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        const createChannel = () => {

            wsTemp?.removeEventListener('close', closeHandler)
            wsTemp?.close()

            wsTemp = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            setWs(wsTemp)
            wsTemp.addEventListener('close', closeHandler)
        }
        createChannel()

        return () => {
            wsTemp.removeEventListener('close', closeHandler)
            wsTemp.close()
        }
    }, [])


    return <div>
        <Row>
            <Col span={18} push={6}>

            </Col>
            <Col span={6} pull={18}>
                <Messages ws={ws}/>
            </Col>
        </Row>
        <Row>
            <AddNewMessageForm ws={ws}/>
        </Row>


    </div>
}

const Messages: FC<{ ws: WebSocket | null }> = ({ws}) => {
    const messagesEndRef = useRef(null)
    const [messages, setMessages] = useState<Array<MessageType>>([])
    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [messages]);


    useEffect(() => {
        let messageHandler = (e: any) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        };
        ws?.addEventListener('message', messageHandler)

        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])

    if (messages === [])
        return <Preloader/>
    else
        return <div style={{height: 400, overflowY: "auto", width: 500}}>
            {messages.map((n: MessageType, index) => <Message key={index} message={n}/>)}
            <div ref={messagesEndRef}/>
        </div>
}

const Message: FC<{ message: MessageType }> = ({message}) => {

    return <div>
        <Avatar src={message.photo}/>
        <span style={{color: "cornflowerblue", marginLeft: 5, marginBottom: 7}}>{message.userName}</span>
        <p style={{marginLeft: 20}}>{message.message}</p>
    </div>
}

const AddNewMessageForm: FC<{ ws: WebSocket | null }> = ({ws}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }

        ws?.addEventListener('open', openHandler)

        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!message)
            return;

        ws?.send(message)
        setMessage('')
    }
    return <div>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{resize: 'none'}}/>
        <Button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage} type={'primary'}>Send</Button>
    </div>
}