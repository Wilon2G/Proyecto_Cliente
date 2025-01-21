import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../User';

export default function HomeHeader() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem('username');

    if (username == '' || username === null) {
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <header className="header">
      <div className="header__logo">
        <img src="src/assets/logos/Logo.png" alt="LOGO" />
        <h3>RetroFrog</h3>
      </div>
      <div className="header__container">
        <form action="#" className="header__search--form">
          <input type="text" className="input" placeholder="Buscar Juegazos" />
          <button className="button">
            <svg className="icon">
              <use xlinkHref="/src/assets/icons/sprite.svg#icon-magnifying-glass"></use>
            </svg>
          </button>
        </form>
        <UserProfile />
      </div>
    </header>
  );
}
