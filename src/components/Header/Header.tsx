import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux_store";
import {Avatar, Button, Dropdown, Menu} from "antd";
import {NavLink, useHistory} from "react-router-dom";
import s from "./Header.module.css";
import {Header} from "antd/es/layout/layout";
import {logout} from "../../redux/auth_reducer";
import {getUserProfile} from "../../redux/profile_reducer";
import Preloader from "../../common/prelooader/Preloader";


const HeaderApp: FC = () => {
    const login = useSelector((state:AppStateType) => state.auth.login)
    const id = useSelector((state: AppStateType) => state.auth.id)

    const dispatch = useDispatch()
    const history = useHistory()
    const logouter = () => {
        dispatch(logout())
    }
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)

    useEffect(() => {
        if (/*history.location.pathname !== '/profile' && */isAuth)
            dispatch(getUserProfile(id as number))

    }, [history, id])

    const profile = useSelector((state: AppStateType) => state.ProfilePage.profile)

    const menu = (
        <Menu>
            <Menu.Item style={{cursor: "default", marginLeft: 5}}>
                {login}
            </Menu.Item>
            <Menu.Item>
                <Button type={"primary"} danger className={s.quit} onClick={logouter}>quit</Button>
            </Menu.Item>
        </Menu>
    )

    if (isAuth && !profile) {
        return <Preloader/>
    }

    return <Header className={s.header}>
        {isAuth ?
            <Dropdown overlay={menu} placement={"bottomRight"}>
                <Avatar shape="square" size="large" style={{marginLeft: "auto"}} src={profile?.photos.small}/>
            </Dropdown>
            : <NavLink to={'/login'} className={s.quit}><Button type={"primary"}>LOGIN</Button></NavLink>}
    </Header>
}







export default HeaderApp