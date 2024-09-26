import React from "react";
import DateAndTimeGraph from "../../components/DateAndTimes";
import ChurchSignups from "../../components/ChurchSignups";

interface ShiftAvailabilitiesProps {}

const ShiftAvailabilities: React.FC<ShiftAvailabilitiesProps> = () => {
  return (
    <>
      <div className="">
        <DateAndTimeGraph />
        <ChurchSignups />
      </div>
    </>
  );
};

export default ShiftAvailabilities;
