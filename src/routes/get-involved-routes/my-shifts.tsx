﻿// import React from "react";
import Spacer from "../../components/Spacer";
import UserShifts from "../../components/UserShifts";
import { useSelector } from "react-redux";

export default function MyShifts() {
  const userId = useSelector((state: any) => state.userId);
  const churchId = useSelector((state: any) => state.churchId);

  if (!userId) {
    return <div className="mx-auto mt-8">Please login to view this page.</div>;
  } else if (!churchId) {
    return (
      <div className="mx-auto mt-8">
        Please complete your profile to view this page.
      </div>
    );
  }

  return (
    <>
      <Spacer />
      <UserShifts />
    </>
  );
}
