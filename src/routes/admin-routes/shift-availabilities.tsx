import React from "react";
import DateAndTimeGraph from "../../components/DateAndTimes";
import ChurchSignups from "../../components/ChurchSignups";

interface ShiftAvailabilitiesProps {}

const ShiftAvailabilities: React.FC<ShiftAvailabilitiesProps> = () => {
  return (
    <>
      <div className="desktop:hidden phone:flex">
        <div>Please access this page from your computer</div>
      </div>
      <div className="hidden desktop:flex flex-col items-start">
        <DateAndTimeGraph />
        <ChurchSignups />
      </div>
    </>
  );
};

export default ShiftAvailabilities;
