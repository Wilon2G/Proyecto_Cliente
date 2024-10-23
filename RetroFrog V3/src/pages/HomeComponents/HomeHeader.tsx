import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";




export default function  HomeHeader  (){
    const navigate = useNavigate();

    useEffect(() => {
        const userName = sessionStorage.getItem('username'); //sessionStorage es otro hook, para mantener la sesion de usuario abierta

        if (userName == '' || userName === null) {
            navigate('/Login');
        }

    }, []);

    return(
        <div className="header">
            <div className="header__section">
                <h1 className="header__title">Welcome to RetroFrog</h1>
            </div>
            <div className="header__section">
                <nav className="header__nav">
                    <Link className="header__link" to={'/'}>Home</Link>
                    {/*<Link className="header__link" to={'/User'}>User</Link>*/}
                    <Link className="header__link" to={'/Login'}>Logout</Link>
                </nav>
            </div>        
        </div>
    )
}