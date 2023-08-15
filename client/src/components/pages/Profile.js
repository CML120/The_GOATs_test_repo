import React from "react";
import { GET_PROFILE, QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';

export default function Profile() {
  const isLoggedIn = Auth.loggedIn();
  const username = isLoggedIn ? Auth.getProfile().username : "";

  const { loading, data } = useQuery(isLoggedIn ? GET_PROFILE : QUERY_USER, {
    variables: { username },
    skip: !isLoggedIn, // Skip the query if the user is not logged in
  });

  console.log("loading:", loading);
  console.log("data:", JSON.stringify(data, null, 2));

  const profile = data?.getProfile || data?.user;
  console.log("Profile data:", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.username}</p>
      <p>Email: {profile.email}</p>
      {profile.level && <p>Level: {profile.level}</p>}
    </div>
  );
}
