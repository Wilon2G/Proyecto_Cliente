import { useState } from 'react';
import '../../sass/components/user.scss';
import { Link } from "react-router-dom";
import pfp from '../../assets/icons/userIcon/mmmMonke.jpg';

const UserProfile = () => {
  const [expanded, setExpanded] = useState(false);
    

  const toggleExpand = () => {
    setExpanded(!expanded);
  };


  return (
    <div className={`profile-card ${expanded ? 'expand' : ''}`}>
      <img src={pfp} className="pic" id="expand-button" onClick={toggleExpand} />
      <div className="below-fold">
        {expanded && (
          <>
            <div className="name">{sessionStorage.getItem('username')}</div>
            {/* <div className="about" >
              <h3></h3>
              <p></p>
            </div> */}
            <div className="row_stats">
              <div className="stat">
                <label>Puntos</label>
                <div className="num">{sessionStorage.getItem('score')}</div>
              </div>
            </div>
            <div className="row">
              <Link className="header__link" to={'/Modify'}>
                <button className="button--user">Modificar</button>
              </Link>
              <Link className="header__link" to={'/Login'}>
                <button className="button--user">Salir</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
