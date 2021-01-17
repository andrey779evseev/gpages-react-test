import s from './Users.module.css';
import { Formik} from 'formik';
import React, {FC} from 'react';
import {FilterType} from '../../redux/users_reducer';
import {useSelector} from "react-redux";
import {getUsersFilterGet} from "../../redux/users_selectors";
import {Button, Dropdown, Menu, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {Form, Input, Select} from "formik-antd";

const {Option} = Select

const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: "true" | 'false' | 'null'
}

export const UsersSearchForm: FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilterGet)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div className={s.findDiv} style={{marginLeft: 160, marginBottom: 30}}>
        <Formik
            enableReinitialize={true}
            initialValues={{term: filter.term, friend: String(filter.friend) as "true" | 'false' | 'null'}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form >
                    <Input name="term" style={{width: 300, height: 34}}/>
                    <Select name="friend" style={{width: 120, height: 34, marginLeft: 10, marginBottom: 2}}  defaultValue="null" >
                        <Option value="null" >All</Option>
                        <Option value="true">Friends</Option>
                        <Option value="false">Not Friends</Option>
                    </Select>
                    <Tooltip title="search">
                        <Button type="primary" htmlType={"submit"} style={{marginLeft: 10}} shape="circle" icon={<SearchOutlined/>}/>
                    </Tooltip>


                </Form>
            )}
        </Formik>

    </div>
})




