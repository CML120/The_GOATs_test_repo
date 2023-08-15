import React from 'react';

const Profile = () => {
  // Retrieve user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div>
      <h1>Profile Page</h1>
      {userInfo ? (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <p>Level: {userInfo.level}</p>
        </div>
      ) : (
        <p>No user info available</p>
      )}
    </div>
  );
};

export default Profile;
