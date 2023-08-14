import React from "react";
import { GET_PROFILE, QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_USER);
  const profile = data?.profile;
  console.log("Profile data:", data);

  return (
    <div>
      {/* <h2>Welcome {profile.username}</h2> */}
      <h2>Welcome</h2>
      {/* <div>
    {loading ? (
    <div>Loading...</div>
    ) : (< />)}
</div> */}
    </div>
  );
}
