import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DarkMode from './components/DarkMode/DarkMode';

const routes =(
  <Router>
    <Routes>
    <Route path='/' extract element ={<Login />} />
      <Route path='/dashboard' extract element ={<Home />} />
      <Route path='/login' extract element ={<Login />} />
      <Route path='/signup' extract element ={<SignUp />} />
    </Routes>
    <DarkMode />
  </Router>
);

const App = ()=> {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App