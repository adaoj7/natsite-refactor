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
      console.log("data", data);
      return axios.delete("/api/deleteShift", {
        data,
      });
    },
    onSettled: () => {
      console.log("onSettled");
      refetchUserShifts();
    },
  });

  console.log("userShifts", data?.data);

  if (isPendingUserShifts) {
    return <div>Loading...</div>;
  }
  if (errorUserShifts) {
    console.log("errorUserShifts", errorUserShifts);
    return <div>Error!</div>;
  }
  if (data.data.length === 0) {
    return (
      <div className="flex flex-col">
        <h1>No Shifts</h1>
        <div>
          If you would like to sign up for shifts please head to:
          <NavLink to={"/getInvolved/setup"} className="ml-1">
            Setup{" "}
          </NavLink>
          or <NavLink to={"/getInvolved/host"}>Host</NavLink>
        </div>
      </div>
    );
  }

  const userShifts = data.data.map((shift: Shift) => {
    const { date, timeRange, typeId, availabilityId, shiftId } = shift;

    return (
      <li className="" key={availabilityId}>
        <div className="">
          <div className="">
            <span className="">Shift type:</span>
            <span className="">{typeId === 1 ? "Setup" : "Host"}</span>
          </div>
          <div className="">
            <span
              className="
            "
            >
              Date:
            </span>
            <span className="">{date}</span>
          </div>
          <div>
            <span className="">Time:</span>
            <span className="">{timeRange}</span>
          </div>
          <div className="">
            <button
              className=""
              onClick={() => mutateAsync({ availabilityId, shiftId })}
            >
              Remove Shift
            </button>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="card bg-secondary">
      <ul className="card-body">{userShifts}</ul>
    </div>
  );
};

export default UserShifts;
