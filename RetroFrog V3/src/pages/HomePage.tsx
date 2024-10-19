import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        let userName = sessionStorage.getItem('username');

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
        </div>
    );
}

export default Home;