import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { helperFunctions } from "../helper-functions/helper-functions";
import clsx from "clsx";

const DateAndTimeGraph: React.FC = () => {
  return (
    <>
      <div className="flex w-full desktop:hidden">
        <DateAndTimeGraphMobile />
      </div>
      <div className="hidden desktop:flex">
        <DateAndTimeGraphDesktop />
      </div>
    </>
  );
};

const DateAndTimeGraphMobile: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["shiftAvailabilities"],
    queryFn: () => axios.get("/api/shiftAvailabilities"),
  });
  // const isLoading = true;
  if (isLoading)
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-3xl">Shift Availabilities</h1>
          <div>Loading...</div>
        </div>
      </div>
    );

  const shiftTypes = Object.keys(data?.data).map((shiftType) => {
    const shiftTypeData = data?.data[shiftType];
    const dates = Object.keys(shiftTypeData).map((date) => {
      return {
        date: shiftTypeData[date].date,
        shifts: shiftTypeData[date].shifts,
      };
    });
    const shiftTimes = dates.map((date) => {
      const shiftTimes = date.shifts.map((shift: any) => {
        const color = () => {
          const avail = shift.availabilityCount;
          if (avail >= 10) {
            return "text-red-600";
          } else if (avail >= 5) {
            return "text-yellow-500";
          } else {
            return "text-green-500";
          }
        };

        if (shift.isFull) {
          return (
            <li
              className="flex flex-row justify-between gap-2"
              key={shift.timeRange}
            >
              <div>{shift.timeRange}</div>
              <div>Shift Full</div>
            </li>
          );
        }
        return (
          <li
            className="pointer-events-none grid grid-cols-2"
            key={shift.timeRange}
          >
            <div className="whitespace-nowrap">{shift.timeRange}</div>
            <div className="whitespace-nowrap">
              Slots:{" "}
              <span className={clsx(color())}>{shift.availabilityCount}</span>
            </div>
          </li>
        );
      });
      return (
        <li key={date.date}>
          <details className="pointer-events-auto w-full">
            <summary className="text-lg font-semibold">
              Date: {date.date}
            </summary>
            <ul className="flex flex-col">{shiftTimes}</ul>
          </details>
        </li>
      );
    });

    const shiftTypeTitle = helperFunctions.capitalizeFirstLetter(shiftType);
    return (
      <div className="" key={shiftType}>
        <h1 className="text-2xl font-semibold">{shiftTypeTitle}</h1>
        <ul className="menu">{shiftTimes}</ul>
      </div>
    );
  });

  return (
    <div className="card w-full">
      <div className="card-body">
        <h1 className="card-title mb-4 text-3xl">Shift Availabilities</h1>
        <div>{shiftTypes}</div>
      </div>
    </div>
  );
};

const DateAndTimeGraphDesktop: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["shiftAvailabilities"],
    queryFn: () => axios.get("/api/shiftAvailabilities"),
  });
  // const isLoading = true;
  if (isLoading)
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-3xl">Shift Availabilities</h1>
          <div>Loading...</div>
        </div>
      </div>
    );

  const shiftTypes = Object.keys(data?.data).map((shiftType) => {
    const shiftTypeData = data?.data[shiftType];
    const dates = Object.keys(shiftTypeData).map((date) => {
      return {
        date: shiftTypeData[date].date,
        shifts: shiftTypeData[date].shifts,
      };
    });
    const shiftTimes = dates.map((date) => {
      const shiftTimes = date.shifts.map((shift: any) => {
        const color = () => {
          const avail = shift.availabilityCount;
          if (avail >= 10) {
            return "text-red-600";
          } else if (avail >= 5) {
            return "text-yellow-500";
          } else {
            return "text-green-500";
          }
        };

        if (shift.isFull) {
          return (
            <div
              className="flex flex-row justify-between gap-2"
              key={shift.timeRange}
            >
              <div>{shift.timeRange}</div>
              <div>Shift Full</div>
            </div>
          );
        }
        return (
          <div className="flex flex-col" key={shift.timeRange}>
            <div className="whitespace-nowrap">{shift.timeRange}</div>
            <div>
              Available Slots:{" "}
              <span className={clsx(color())}>{shift.availabilityCount}</span>
            </div>
          </div>
        );
      });
      return (
        <div className="card" key={date.date}>
          <div className="card-body">
            <div className="mb-2 font-semibold">Date: {date.date}</div>
            <div className="flex flex-row gap-6">{shiftTimes}</div>
          </div>
        </div>
      );
    });

    const shiftTypeTitle = helperFunctions.capitalizeFirstLetter(shiftType);
    return (
      <div className="flex flex-col flex-wrap" key={shiftType}>
        <h1 className="card-title">{shiftTypeTitle}</h1>
        <div className="">{shiftTimes}</div>
      </div>
    );
  });

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-3xl">Shift Availabilities</h1>
        <div>{shiftTypes}</div>
      </div>
    </div>
  );
};

export default DateAndTimeGraph;
