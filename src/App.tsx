import React, {FC, lazy, Suspense, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import UsersPage from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./common/prelooader/Preloader";
import {Layout} from "antd";
import {Content, Footer} from "antd/es/layout/layout";
import store, {AppStateType} from "./redux/redux_store";
import {connect, Provider, useDispatch, useSelector} from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import {ChatPage} from "./pages/Chat/ChatPage";

//lazy import work only with default export
//const Login = lazy(() => import('./components/Login/Login'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));


const App: FC = () => {
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
    return <Preloader/>
    }

    return (
        <Layout >
            <Header/>
            <Layout>
                <Navbar/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}>
                        <Suspense fallback={<Preloader />}>
                            <Route path="/profile/:userId?" render={() =>
                                <ProfileContainer/>}/>
                            <Route path="/dialogs" render={() =>
                                <DialogsContainer/>}/>
                            <Route path="/users" render={() => <UsersPage/>}/>
                            <Route path="/login" render={() => <Login/>}/>
                            <Route path="/chat" render={() => <ChatPage/>}/>
                        </Suspense>
                    </Content>
                </Layout>

            </Layout>
            <Footer style={{ textAlign: 'center' }}>Malifor Design 2077</Footer>
        </Layout>)
}


let AppContainer =  connect(withRouter)(App)


let SamuraiJSApp: FC = () => {
    return <BrowserRouter >
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp
