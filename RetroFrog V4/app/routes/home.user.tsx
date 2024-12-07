import React, { useEffect, useState } from 'react';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sex: '',
    score: 0,
    theme: ''
  });

  useEffect(() => {
    // Obtener la información del usuario usando fetch
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            name: data.name,
            email: data.email,
            sex: data.sex,
            score: data.score,
            theme: data.theme
          });
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    
    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditing(false);
      } else {
        console.error('Error al actualizar los datos del usuario');
      }
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-purple-200 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {!editing ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Sex:</strong> {user.sex}</p>
          <p><strong>Score:</strong> {user.score}</p>
          <p><strong>Theme:</strong> {user.theme}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-2 p-2 border"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mb-2 p-2 border"
            />
          </div>
          <div>
            <label>Sex:</label>
            <input
              type="text"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="mb-2 p-2 border"
            />
          </div>
          <div>
            <label>Score:</label>
            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="mb-2 p-2 border"
            />
          </div>
          <div>
            <label>Theme:</label>
            <input
              type="text"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="mb-2 p-2 border"
            />
          </div>
          <button
            onClick={handleSave}
            className="mt-4 p-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditing(false)}
            className="ml-4 mt-4 p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
