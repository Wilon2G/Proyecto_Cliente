
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/HomePage'; //En home se hace la app, solo que antes te redirige al login y Register si hace falta
import Login from './pages/auth/LoginPage';
import Register from './pages/auth/SignupPage';
import Modify from './pages/auth/PersonalPage';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/modify' element={<Modify />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

