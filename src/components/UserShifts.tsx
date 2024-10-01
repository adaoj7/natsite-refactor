import { useMutation, useQuery } from "@tanstack/react-query";
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
    retry: true,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (data: { shiftId: number; availabilityId: number }) => {
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
      <div className="card">
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

  const userShifts = data.data.map((shift: Shift) => {
    const { date, timeRange, typeId, availabilityId, shiftId } = shift;

    return (
      <li
        className="p-2 phone:w-full desktop:w-52 desktop:mx-4 text-lg "
        key={availabilityId}
      >
        <div className="flex flex-col [&>*]:mb-2">
          <div className="whitespace-nowrap">
            <span>Shift type: </span>
            <span className="font-semibold ">
              {typeId === 1 ? "Setup" : "Host"}
            </span>
          </div>
          <div className="whitespace-nowrap">
            <span>Date: </span>
            <span className="font-semibold whitespace-nowrap">{date}</span>
          </div>
          <div className="whitespace-nowrap">
            <span>Time: </span>
            <span className="font-semibold whitespace-nowrap">{timeRange}</span>
          </div>
          <button
            className="flex btn"
            onClick={() => mutateAsync({ availabilityId, shiftId })}
          >
            Remove Shift
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="card">
      <ul className="card-body list-none flex-wrap flex-row">{userShifts}</ul>
    </div>
  );
};

export default UserShifts;
