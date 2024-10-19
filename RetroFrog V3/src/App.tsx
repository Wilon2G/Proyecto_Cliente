// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage'; //En home se hace la app, solo que antes te redirige al login y Register si hace falta
import Login from './pages/LoginPage';
import Register from './pages/SignupPage';

//npm run dev -> Iniciar projecto
//json-server --watch usersBD.json -> Iniciar conexion y login con json

//Nuevos:
//npm install react-router-dom @types/react-router-dom
//npm install -g json-server (json-server --watch documento json de usuarios), si no se indica puerto, esta en el 3000

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


/** Guille
 * 
 * import { Inicio } from './inicio/inicio'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <Inicio />
  )
}

export default App
 * 
 */






{/* <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </> */}