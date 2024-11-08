import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserProfile from "./User";


export default function  HomeHeader  (){
    const navigate = useNavigate();

    useEffect(() => {
        const userName = sessionStorage.getItem('username'); //sessionStorage es otro hook, para mantener la sesion de usuario abierta

        if (userName == '' || userName === null) {
            navigate('/Login');
        }

    }, []);

    return(
        <header className="header">
            <div className="header__logo">
                <img src="src/assets/logos/Logo.png" alt="LOGO" />
                <h3>RetroFrog</h3>
            </div>
            <div className="header__section">
                <form action="#" className="search">
                        <input type="text" className="search__input" placeholder="Buscar Juegazos" />
                        <button className="search__button">
                            <svg className="search__icon">
                                <use xlinkHref="/src/assets/icons/sprite.svg#icon-magnifying-glass"></use>
                            </svg>
                        </button>
                </form>
                <div className="header__section--user">
                    <UserProfile />
                </div>
            </div>    
        </header>
    )
}