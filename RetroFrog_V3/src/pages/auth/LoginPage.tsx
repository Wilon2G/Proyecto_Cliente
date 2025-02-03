import { useEffect, useState } from 'react';
import { VscEye } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';

export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  score: number;
  userInfo: {
    gamesPlayed: string[];
    gamesWinned: string[];
    gamesUnlocked: string[];
    gamesLocked: string[];
    theme: string;
  };
};

const LoginPage: React.FC = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');

  //Para ocultar y mostrar contrseña
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown); //Cambia estado

  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear(); //En sessionStorage se almacena usuario, asi evita que hagas login siempre, pero al entrar al login te elimina la sesion (Aqui vienes al hacer logout)
  });

  const proceedLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validate()) {
      // Realizamos la petición sin concatenar el username
      fetch('http://localhost:3000/users')
        .then((res) => {
          // Verifica que la respuesta sea correcta
          if (!res.ok) {
            throw new Error(
              'Error en la respuesta del servidor: ' + res.status,
            );
          }

          return res.json(); // Convertimos la respuesta en JSON
        })
        .then((resp) => {
          
          const user = resp.find((u: User) => u.username === username);

          if (!user) {
            alert('Please Enter valid username');
          } else {
            if (user.password === password) {
              //console.log("Success");
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('id', user.id);
              sessionStorage.setItem('name', user.name);
              sessionStorage.setItem('email', user.email);
              sessionStorage.setItem('score', user.score.toString());
              sessionStorage.setItem(
                'unlockedGames',
                user.userInfo.gamesUnlocked,
              );

              navigate('/'); // Te redirige a home si está todo correcto
            } else {
              alert('Please Enter valid credentials');
            }
          }
        })
        .catch((err) => {
          console.error('Error:', err.message);
        });
    }
  };

  const validate = () => {
    let result = true;

    if (username === '' || username === null) {
      result = false;
      //Mensaje
      alert('Please Enter username');
    }

    if (password === '' || password === null) {
      result = false;
      //Mensaje
      alert('Please Enter Password');
    }

    return result;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ alignSelf: 'center' }}>
        <div className="logo">
          <img src="src/assets/logos/Logo.png" alt="LOGO" />
        </div>

        <div className="login__wrapper">
          <form onSubmit={proceedLogin} className="login__form">
            <h2>Login</h2>
            <div className="login__form--input-field">
              <input
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              ></input>
              <label>Enter your username </label>
            </div>
            <div className="login__form--input-field">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={shown ? 'text' : 'password'}
                required
              ></input>
              <label>Enter your password</label>
              <VscEye className="password-eye" onClick={switchShown} />
            </div>
            <div className="login__form--forget">
              <label htmlFor="login__form--remember">
                <input
                  type="checkbox"
                  className="login__form--remember"
                ></input>
                <p>Remember me</p>
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Login</button>
            <Link className="login__form--register" to={'/register'}>
              New User
            </Link>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default LoginPage;
