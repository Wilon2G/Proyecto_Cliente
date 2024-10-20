import '../index.css';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Tipado para los datos del JSON
type PersonalInfo = {
    games: string;
    More: string;
};

type User = {
    idUser: string;
    userName: string;
    password: string;
    name: string;
    email: string;
    puntuacion: string;
    personalInfo: PersonalInfo;
};


const LoginPage: React.FC = () => {
    const [userName, userNameUpdate] = useState('');
    const [password, passwordUpdate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear(); //En sessionStorage se almacena usuario, asi evita que hagas login siempre, pero al entrar al login te elimina la sesion (Aqui vienes al hacer logout)
    })

    const proceedLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validate()) {
            // Realizamos la petición sin concatenar el userName
            fetch("http://localhost:3000/users")
                .then((res) => {
                    // Verifica que la respuesta sea correcta
                    if (!res.ok) {
                        throw new Error("Error en la respuesta del servidor: " + res.status);
                    }

                    return res.json();  // Convertimos la respuesta en JSON
                })
                .then((resp) => {
                    const user = resp.find((u: User) => u.userName === userName);

                    if (!user) {
                        //Mensaje
                        //toast.error("Please Enter valid username");
                    } else {
                        if (user.password === password) {
                            //Mensaje
                            //toast.success("Success");
                            sessionStorage.setItem('username', userName)
                            navigate('/'); // Te redirige a home si está todo correcto
                        } else {
                            //Mensaje
                            //toast.error("Please Enter valid credentials");
                        }
                    }
                })
                .catch((err) => {
                    // Mostramos el error exacto
                    //toast.error("Login Failed due to: " + err.message);
                    console.error("Error:", err.message);
                });
        }
    }

    const validate = () => {
        let result = true;

        if (userName === '' || userName === null) {
            result = false;
            //Mensaje
            //toast.warning("Please Enter Username");
        }

        if (password === '' || password === null) {
            result = false;
            //Mensaje
            //toast.warning("Please Enter Password");
        }

        return result;
    }

    return (
        <div className="login__wrapper">
            <form onSubmit={proceedLogin} className="login__form">
                <h2>Login</h2>
                <div className="login__form--input-field">
                    <input value={userName} onChange={e => userNameUpdate(e.target.value)} required></input>
                    <label>Enter your username </label>
                </div>
                <div className="login__form--input-field">
                    <input value={password} onChange={e => passwordUpdate(e.target.value)} type="password" required></input>
                    <label>Enter your password</label>
                </div>
                <div className="login__form--forget">
                    <label htmlFor="login__form--remember">
                        <input type="checkbox" className="login__form--remember"></input>
                        <p>Remember me</p>
                    </label>
                    <a href="#">Forgot password?</a>
                </div>
                <button type="submit">Login</button>
                <Link className="login__form--register" to={'/register'}>New User</Link>
            </form>
        </div>
    );
}

export default LoginPage;
