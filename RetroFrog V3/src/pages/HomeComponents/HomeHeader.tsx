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
        <div className="header">
            <div className="header__section"> 
            </div>
            <div className="header__section">
            <img src="../../../media/FroggoLoggo.png" alt="LOGO" />
                <h1 className="header__title">RetroFrog</h1>
                <h3 className="header__subtitle">Welcome to RetroFrog</h3>
            </div>
            <div className="header__section">
                <div className="header__user">
                        <UserProfile></UserProfile>
                </div>
            </div>    
                
            
        </div>
    )
}