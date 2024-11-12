﻿import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

interface UserShiftsProps {}

interface Shift {
  date: string;
  timeRange: string;
  typeId: number;
  availabilityId: number;
  shiftId: number;
}

const UserShifts: React.FC<UserShiftsProps> = () => {
  const userId = useSelector((state: any) => state.userId);

  const {
    isError: errorUserShifts,
    isPending: isPendingUserShifts,
    data,
    refetch: refetchUserShifts,
  } = useQuery({
    queryKey: ["userShifts"],
    queryFn: async () => {
      const response = await axios.get(`/api/userShifts`, {
        params: { userId },
      });
      return response;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: {
      shiftId: number;
      availabilityId: number;
      typeId: number;
    }) => {
      return axios.delete("/api/deleteShift", {
        data,
      });
    },
    onSettled: () => {
      refetchUserShifts();
    },
  });

  if (isPendingUserShifts) {
    return <div>Loading...</div>;
  }

  if (errorUserShifts) {
    console.log("errorUserShifts", errorUserShifts);
    return <div>Error!</div>;
  }

  if (data.data.length === 0) {
    return (
      <div className="card mx-auto w-[450px]">
        <div className="card-body text-center">
          <h1 className="card-title">No Shifts</h1>
          If you would like to sign up for shifts please head to:
          <NavLink to={"/getInvolved/setup"} className="btn btn-primary">
            Setup{" "}
          </NavLink>
          or{" "}
          <NavLink to={"/getInvolved/host"} className="btn btn-primary">
            Host
          </NavLink>
        </div>
      </div>
    );
  }

  const typeIds: number[] = Array.from(
    new Set(data.data.map((shift: Shift) => shift.typeId))
  );

  const userShifts: React.ReactNode[] = [];

  typeIds.forEach((typeId) => {
    userShifts.push(
      <div className="flex flex-col gap-4">
        <div key={typeId}>
          <h2 className="px-4 text-2xl font-bold desktop:px-0">
            {typeId === 1 ? "Setup" : "Host"}
          </h2>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {data.data
            .filter((shift: Shift) => shift.typeId === typeId)
            .map((shift: Shift) => {
              const { date, timeRange, typeId, availabilityId, shiftId } =
                shift;

              return (
                <li
                  className="w-full px-12 text-xl desktop:w-44 desktop:px-0 desktop:text-base"
                  key={availabilityId}
                >
                  <div className="flex flex-col [&>*]:mb-2">
                    <div className="whitespace-nowrap">
                      <span>Shift type: </span>
                      <span className="font-semibold">
                        {typeId === 1 ? "Setup" : "Host"}
                      </span>
                    </div>
                    <div className="whitespace-nowrap">
                      <span>Date: </span>
                      <span className="whitespace-nowrap font-semibold">
                        {date}
                      </span>
                    </div>
                    <div className="whitespace-nowrap">
                      <span>Time: </span>
                      <span className="whitespace-nowrap font-semibold">
                        {timeRange}
                      </span>
                    </div>
                    <button
                      className="btn flex"
                      onClick={() =>
                        mutateAsync({ availabilityId, shiftId, typeId })
                      }
                    >
                      Remove Shift
                    </button>
                  </div>
                </li>
              );
            })}
        </div>
      </div>
    );
  });

  data.data.filter((shift: Shift) => {
    const { date, timeRange, typeId, availabilityId, shiftId } = shift;

    return (
      <li className="" key={availabilityId}>
        <div className="flex flex-col [&>*]:mb-2">
          <div className="whitespace-nowrap">
            <span>Shift type: </span>
            <span className="font-semibold">
              {typeId === 1 ? "Setup" : "Host"}
            </span>
          </div>
          <div className="whitespace-nowrap">
            <span>Date: </span>
            <span className="whitespace-nowrap font-semibold">{date}</span>
          </div>
          <div className="whitespace-nowrap">
            <span>Time: </span>
            <span className="whitespace-nowrap font-semibold">{timeRange}</span>
          </div>
          <button
            className="btn flex"
            onClick={() => mutateAsync({ availabilityId, shiftId, typeId })}
          >
            Remove Shift
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="card">
      <ul className="card-body list-none flex-col flex-wrap">{userShifts}</ul>
    </div>
  );
};

export default UserShifts;
