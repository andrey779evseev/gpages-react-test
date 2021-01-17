import React, {FC} from 'react';
import {Form, Formik} from 'formik';
import {login} from "../../redux/auth_reducer";
import {useDispatch, useSelector} from "react-redux";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Button} from 'antd';
import {Input, Checkbox} from "formik-antd";
import {AppStateType} from "../../redux/redux_store";
import {Redirect} from "react-router-dom";


const BasicExample: FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    if (isAuth){
        return <Redirect to={'/profile'}/>
    }

    return (<div>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: ''
                }}
                onSubmit={() => {}}
            >
                {props => (
                    <Form style={{width: 350, marginLeft: "auto", marginRight: "auto"}} onSubmit={() => {
                        dispatch(login(props.values.email, props.values.password, props.values.rememberMe, props.values.captcha))
                    }}>
                        <Input placeholder="Email" name="email" style={{width: 320, marginBottom: 10}} onChange={props.handleChange} value={props.values.email}/>
                        <Input.Password name="password" style={{width: 320}}
                               onChange={props.handleChange}
                               value={props.values.password}
                               placeholder="input password"
                               iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        <Checkbox name={"rememberMe"}>Remember Me</Checkbox>
                        {captchaUrl && <img src={captchaUrl}/>}
                        {captchaUrl && <Input name="captcha" placeholder="Symbols From Image" />}
                        <Button htmlType={"submit"} style={{width: 100, marginTop: 10, marginLeft: 100}} type="primary" >Login</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}



export default BasicExample