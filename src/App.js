
import { Routes, Route } from 'react-router-dom'
import MyblogPage from './pages/myblogpage';
import NavBar from './Navigationbar';
import Test from './pages/test'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<MyblogPage />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
