// import React from "react";
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
        Please complete your profile to view this page.
      </div>
    );
  }

  return (
    <div className="mx-auto phone:my-4 desktop:my-12">
      <Shifts shiftType="setup" />
    </div>
  );
}
