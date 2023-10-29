import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyBlogPage from './pages/MyBlogPage';
import Login from './pages/Login';
import WritePost from './pages/writePost'
import Store from './pages/Store';
import SignIn1 from './pages/SignIn-1'
import SignIn2 from "./pages/SignIn-2";
import SideProfile from "./components/SideProfile";
import LoginRedirectPage from "./components/LoginRedirectPage";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path={'/myblogpage/:id'} element={<MyBlogPage/>}/>
                <Route path='/writepost' element={<WritePost/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/store' element={<Store/>}/>
                <Route path={'/signin1'} element={<SignIn1/>}/>
                <Route path={'/signin2'} element={<SignIn2/>}/>
                <Route path={'/sideprofile'} element={<SideProfile/>}/>
                <Route path={'/oauth/redirected/:sns'} element={<LoginRedirectPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
