import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyBlogPage from './pages/MyBlogPage';
import Login from './pages/Login';
import WritePost from './pages/writePost'
import PostView from './pages/PostView'
import Store from './pages/Store';
import SignIn1 from './pages/SignIn-1'
import SignIn2 from "./pages/SignIn-2";
import SideProfile from "./components/SideProfile";
import KakaoRedirectPage from "./components/KakaoRedirectPage";
import NaverRedirectPage from "./components/NaverRedirectPage";
import GoogleRedirectPage from "./components/GoogleRedirectPage";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path='/myblogpage' element={<MyBlogPage/>}/>
                <Route path='/writepost' element={<WritePost/>}/>
                <Route path='/postview/:id' element={<PostView/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/store' element={<Store/>}/>
                <Route path={'/signin1'} element={<SignIn1/>}/>
                <Route path={'/signin2'} element={<SignIn2/>}/>
                <Route path={'/sideprofile'} element={<SideProfile/>}/>
                <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />}></Route>
                <Route path="/oauth/redirected/naver" element={<NaverRedirectPage />}></Route>
                <Route path="/oauth/redirected/google" element={<GoogleRedirectPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
