import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ModifyPage: React.FC = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male'); 
  
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('id'); 

  useEffect(() => {
    setusername(sessionStorage.getItem('username') || '');
    setName(sessionStorage.getItem('name') || '');
    setEmail(sessionStorage.getItem('email') || '');
  }, []);

  const isValidate = () => {
    let infoGiven = true;
    let errorMessage = 'Please enter the value in ';

    if (!username) {
      infoGiven = false;
      errorMessage += 'username ';
    }
    if (!password) {
      infoGiven = false;
      errorMessage += 'password ';
    }
    if (!name) {
      infoGiven = false;
      errorMessage += 'name ';
    }
    if (!email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email)) {
      infoGiven = false;
      errorMessage += 'email ';
    }

    if (!infoGiven) alert(errorMessage);
    return infoGiven;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (isValidate() && userId) {
      const updatedUser = {
        username,
        password,
        name,
        email,
        gender,
      };

      
      fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update user');
          }
          return response.json();
        })
        .then(() => {
          alert('User information updated successfully.');
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('email', email);
          navigate('/'); 
        })
        .catch((error) => {
          console.error('Error:', error.message);
          alert('Failed to update user information.');
        });
    } else if (!userId) {
      alert('User ID not found in session.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ alignSelf: 'center' }}>
        <div className="logo">
          <img src="src/assets/logos/Logo.png" alt="LOGO" />
        </div>
    <div className="signup__wrapper" >
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2>User Modification</h2>

        <div className="signup__form--input-field">
          <input
            value={username}
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter new username"
            required
          />
          <label>username</label>
        </div>

        <div className="signup__form--input-field">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
            required
          />
          <label>Password</label>
        </div>

        <div className="signup__form--input-field">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new full name"
            required
          />
          <label>Full Name</label>
        </div>

        <div className="signup__form--input-field">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter new email"
            required
          />
          <label>Email</label>
        </div>

        <p>
          <b>Change your gender</b>
        </p>
        <div className="signup__form--gender">
          <label>
            <input
              type="radio"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
              name="gender"
              value="male"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
              name="gender"
              value="female"
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              checked={gender === 'other'}
              onChange={() => setGender('other')}
              name="gender"
              value="other"
            />
            Other
          </label>
        </div>

        <button type="submit">Change User Info</button>
        <Link className="signup__form--back" to={'/'}>
          Back
        </Link>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ModifyPage;
