import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, QUERY_USER, QUERY_ME } from '../../utils/queries';

const Profile = () => {
//   const { username: userParam } = useParams();
// console.log(userParam);
//   const { loading, data } = useQuery(userParam ? QUERY_USER : GET_PROFILE, {
//     variables: { username: userParam },
//   });
const { loading, data } = useQuery(QUERY_ME);
  // const user = data?.me || data?.user || {};
  // Retrieve user info from localStorage
  const userInfo = data?.me || {}
  if (loading) {
    return <div>Loading...</div>;
  }
  if(!userInfo.username) {
    return (
      <h4>You must be logged in!</h4>
    )
  }
  return (
    <div>
      <h1>Profile Page</h1>
      {userInfo ? (
        <div>
          <p>Username: {userInfo?.username}</p>
          <p>Email: {userInfo?.email}</p>
          <p>Level: {userInfo?.level}</p>
        </div>
      ) : (
        <p>No user info available</p>
      )}
    </div>
  );
};

export default Profile;
