// import React from "react";
import { NavLink } from "react-router-dom";
import Shifts from "../../components/Shifts";
import { useSelector } from "react-redux";

export default function Setup() {
  const userId = useSelector((state: any) => state.userId);
  const churchId = useSelector((state: any) => state.churchId);

  if (!userId) {
    return <div className="mx-auto mt-8">Please login to view this page.</div>;
  } else if (!churchId) {
    return (
      <div className="mx-auto mt-8">
        Please complete your{" "}
        <NavLink to="/user" className="italic hover:underline">
          profile
        </NavLink>{" "}
        to view this page.
      </div>
    );
  }

  return (
    <div className="mx-auto phone:my-4">
      <div className="card-body items-center text-xl">
        <h2 className="card-title text-2xl">Setup</h2>
        <div className="mb-4 max-w-[700px]">
          We are looking for volunteers to help with set up, tear down, and
          decoration. Feel free to sign up for as many shifts as you would like.
          When showing up to host, please arrive 15 minutes early to sign in. We
          also ask that you wear business casual attire.
        </div>
        <Shifts shiftType="setup" />
      </div>
    </div>
  );
}
