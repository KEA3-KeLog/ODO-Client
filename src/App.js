import './App.css';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyblogPage from './pages/myblogpage';
import NavBar from './Navigationbar';
import Test from './pages/test'

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path='/myblogpage' element={<MyblogPage />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
