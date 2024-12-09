import React, { useEffect, useState } from 'react';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {

  return (
    <div className="bg-purple-200 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

        <div>
          {/* <p><strong>Name:</strong> {user.name}</p> */}
          {/* <p><strong>Email:</strong> {user.email}</p> */}
          {/* <p><strong>Sex:</strong> {user.sex}</p> */}
          {/* <p><strong>Score:</strong> {user.score}</p> */}
          {/* <p><strong>Theme:</strong> {user.theme}</p> */}
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
          <button
            className="ml-4 mt-4 p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
      </div>
  );
};

export default UserProfile;
