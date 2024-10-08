import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyBlogPage from './pages/MyBlogPage';
import Login from './pages/Login';
import WritePost from './pages/writePost'
import PostView from './pages/PostView'
import SignIn1 from './pages/SignIn-1'
import SignIn2 from "./pages/SignIn-2";
import LoginRedirectPage from "./components/LoginRedirectPage";
import MyPage from "./pages/MyPage";
import EditPost from './pages/EditPost';
import PostsByTag from './pages/PostsByTag';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path={"/"} element={<MainPage/>}/>
                <Route path='/myblogpage/:userId' element={<MyBlogPage />}/>
                <Route path='/writepost/:userId' element={<WritePost/>}/>
                <Route path='/postview/:postId' element={<PostView/>}/>
                <Route path='/editpost/:postId' element={<EditPost/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path={'/signin1'} element={<SignIn1/>}/>
                <Route path={'/signin2'} element={<SignIn2/>}/>
                <Route path={'/oauth/redirected/:sns'} element={<LoginRedirectPage />}></Route>
                <Route path='/mypage/:userId' element={<MyPage />} />
                <Route path='/mypage/:userId/postsbytag' element={<PostsByTag />} />
                <Route path='/postsbytag' element={<PostsByTag />} />
            </Routes>
        </div>
    );
}

export default App;
