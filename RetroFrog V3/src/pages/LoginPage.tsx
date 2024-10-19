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
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={proceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">

                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input value={userName} onChange={e => userNameUpdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input value={password} onChange={e => passwordUpdate(e.target.value)} type="password" className="form-control"></input>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
