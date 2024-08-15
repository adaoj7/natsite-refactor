// import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spacer from "../../components/Spacer";
import IsAuthenticated from "../../components/IsAuthenticated";

export default function MyShifts() {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <IsAuthenticated isAuthenticated={isAuthenticated} />;
  }

  return (
    <>
      <Spacer />
      <div>My Shifts</div>;
    </>
  );
}
