import React, {FC} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {Layout, Menu} from "antd";
import {MessageOutlined, UserOutlined, ProfileOutlined, WechatOutlined} from "@ant-design/icons";
import s from './Navbar.module.css'


const Navbar: FC = () => {
    const history = useHistory()
    const pathname = history.location.pathname
    return <Layout.Sider width={200} className="site-layout-background" >

        <Menu
            mode="inline"
            defaultSelectedKeys={ pathname === '/profile' ? ['1'] : pathname === '/dialogs' ? ['2']: pathname === '/users' ? ['3'] : pathname === '/chat' ? ['4'] : ['1'] }
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="1"  icon={<ProfileOutlined />}>
                <NavLink  to="/profile" >Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="2"  icon={<MessageOutlined />}>
                <NavLink to="/dialogs">Messages</NavLink>
            </Menu.Item>
            <Menu.Item key="3"  icon={<UserOutlined />}>
                <NavLink to="/users" >Users</NavLink>
            </Menu.Item>
            <Menu.Item key="4"  icon={<WechatOutlined />}>
                <NavLink to="/chat" >Chat</NavLink>
            </Menu.Item>
        </Menu>
    </Layout.Sider>
}

export default Navbar