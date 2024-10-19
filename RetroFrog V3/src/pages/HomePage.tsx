import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Inicio } from "./MainPage";
const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userName = sessionStorage.getItem('username'); //sessionStorage es otro hook, para mantener la sesion de usuario abierta

        if (userName == '' || userName === null) {
            navigate('/Login');
        }

    }, []);

    return (
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link to={'/Login'}>Logout</Link>
            </div>
            <h1>Welcome to RetroFrog</h1>
            <Inicio />
        </div>
    );
}

export default Home;