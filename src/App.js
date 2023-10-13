import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyblogPage from './pages/myblogpage';
import NavBar from './Navigationbar';
import Test from './pages/test'
import Login from './pages/login';
import WritePost from './pages/writePost'
import Store from './pages/Store';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path='/myblogpage' element={<MyblogPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/writepost' element={<WritePost />} />
        <Route path='/login' element={<Login />} />
        <Route path='/store' element={<Store />} />
      </Routes>
    </div>
  );
}

export default App;
