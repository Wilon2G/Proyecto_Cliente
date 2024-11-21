import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male'); //Se puede poner por defecto para que se marque el check

  //Caracteristicas del usuario que se rellenaran mas tarde
  const score = 0;
  const userInfo = {
    gamesPlayed: [],
    gamesWinned: [],
    gamesUnlocked: [
      'fa5ce516-1c26-4018-9d98-9225068ccc18',
      'b97bf75d-5764-46b5-be5e-fe4df0d0af4a',
      '3ed4a416-12c4-4a0e-98e6-48fa7b6e7d3e',
      '5aabf3c9-8h7d-4f6a-902a-99123f0e3f2c',
    ],
    gamesLocked: [],
    theme: 'dark',
  };

  const navigate = useNavigate(); //hook

  const isValidate = () => {
    let infoGiven = true;
    let errorMessage = 'Please enter the value in ';

    if (userName === null || userName === '') {
      infoGiven = false;
      errorMessage += `${userName}`;
    }
    if (password === null || password === '') {
      infoGiven = false;
      errorMessage += `${password}`;
    }
    if (name === null || name === '') {
      infoGiven = false;
      errorMessage += `${name}`;
    }
    if (gender === null || gender === '') {
      infoGiven = false;
      errorMessage += `${gender}`;
    }

    if (!infoGiven) {
      //Mostrar mensaje de warning
      alert(errorMessage);
    } else {
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) {
        infoGiven = false;
        //Mostrar mensaje de warning
        alert('Please enter the valid email');
      }
    }

    return infoGiven;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isValidate()) {
      event.preventDefault(); //Prevenir que se actualice la pagina al hacer click en el boton
      const userObj = {
        userName,
        password,
        name,
        email,
        gender,
        score,
        userInfo,
      }; //Se crea un objeto con toda esta informacion de usuario
      //console.log(userObj);

      //Para llamar a la API (JSON) se necesita fetch("APIEndPOint")
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(userObj),
      })
        .then(() => {
          console.log('Registered successfully.');
          navigate('/login'); //Depues de registrarte te manda al login
        })
        .catch((err) => {
          console.log('Error: ' + err.message);
        });
    }
  };

  return (
    <div className="signup__wrapper" style={{ marginTop: '6%' }}>
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2>User Registeration</h2>

        <div className="signup__form--input-field">
          <input
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <label>Enter your username </label>
        </div>

        <div className="signup__form--input-field">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          ></input>
          <label>Enter your password </label>
        </div>

        <div className="signup__form--input-field">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <label>Enter your full name </label>
        </div>

        <div className="signup__form--input-field">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          ></input>
          <label>Enter your email </label>
        </div>

        <p>
          <b>Gender</b>
        </p>
        <div className="signup__form--gender">
          <label htmlFor="gender">
            <input
              type="radio"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="male"
            ></input>
            Male
          </label>
          <label htmlFor="gender">
            <input
              type="radio"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="female"
            ></input>
            Female
          </label>
          <label htmlFor="gender">
            <input
              type="radio"
              checked={gender === 'other'}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value="other"
            ></input>
            Other
          </label>
        </div>

        <button type="submit">Register</button>
        <Link className="signup__form--back" to={'/login'}>
          Back
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
