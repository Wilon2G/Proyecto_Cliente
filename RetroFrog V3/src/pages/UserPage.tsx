import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        userName: "",
        email: "",
        name: "",
        gender: "male",
        password:"",
        id:""
    });

    // Obtener el nombre de usuario del sessionStorage para cargar los detalles
    useEffect(() => {
        const userName = sessionStorage.getItem('username');
        if (!userName) {
            navigate('/login'); // Redirigir si no está autenticado
        } else {
            // Cargar datos del usuario (simulado)
            fetch(`http://localhost:3000/users?username=${userName}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length > 0) {
                        setUserDetails(data[0]); // Cargar los detalles del primer usuario encontrado
                    }
                });
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUserDetails = {
            userName: userDetails.userName,
            password: userDetails.password,
            name: userDetails.name,
            email: userDetails.email,
            gender: userDetails.gender,
            
        };
    
        fetch(`http://localhost:3000/users/${userDetails.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        })
            .then((response) => response.json())
            .then(() => {
                alert("User details updated successfully!");
                navigate('/'); // Redirigir a la página de inicio después de la actualización
            })
            .catch((error) => {
                console.error("Error updating user details:", error);
            });
    };

    return (
        <div className="user__wrapper">
            <h2>User:  {sessionStorage.getItem('username')} </h2>
            <form className="user__form" onSubmit={handleSubmit}>
                <div className="user__form--input-field">
                    <input
                        type="text"
                        name="userName"
                        value={userDetails.userName}
                        onChange={handleChange}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="user__form--input-field">
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Full Name</label>
                </div>
                <div className="user__form--input-field">
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                </div>
                <div className="user__form--input-field">
                    <input
                        type="password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                </div>
                <div className="user__form--input-field">
                    <p>Gender</p>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={userDetails.gender === 'male'}
                        onChange={handleChange}
                    /> Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userDetails.gender === 'female'}
                        onChange={handleChange}
                    /> Female
                    <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={userDetails.gender === 'other'}
                        onChange={handleChange}
                    /> Other
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UserPage;
