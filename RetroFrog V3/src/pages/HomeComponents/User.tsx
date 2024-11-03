import React, { useState } from 'react';
import '../../sass/layout/user.scss';
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
      <div className={`profile-card ${expanded ? 'expand' : ''}`}>
        <div className="cover"></div>
        <div className="profile">
          <img className='pic'id="expand-button" onClick={toggleExpand}/>
          <div className="below-fold">
            <div className="name">{sessionStorage.getItem('username')}</div>
            <div className="about">
              <h3>Sobre el jugador</h3>
              <p>Un experto en mariano hermanos</p>
            </div>
            <div className="row_stats">
              <div className="stat">
                <label>Puntos</label>
                <div className="num">999</div>
              </div>
            </div>
            <div className="row">
              <Link className='header__link' to={'/Modify'}>
                <button className="button">Modificar</button>
              </Link>
              
              <Link className="header__link" to={'/Login'}>
                <button className="button">Salir</button>
              </Link>            
            </div>
          </div>
        </div>
      </div>  
  );
};

export default UserProfile;
