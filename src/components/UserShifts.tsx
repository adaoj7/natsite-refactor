import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

interface UserShiftsProps {}

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
    mutationFn: (data) => {
      return axios.delete("/api/volunteer", {
        data: {
          availabilityId: availId,
          shiftId: shiftId,
        },
      });
    },
    onSettled: () => {
      console.log("onSettled");
      refetchUserShifts();
    },
  });

  console.log("userShifts", data);

  if (isPendingUserShifts) {
    return <div>Loading...</div>;
  }
  if (errorUserShifts) {
    console.log("errorUserShifts", errorUserShifts);
    return <div>Error!</div>;
  }

  const userShifts = data.data.map((shift: any) => {
    const { date, timeRange, typeId } = shift;
    return (
      <li className="desktop:flex phone:hidden justify-between">
        <div className="grid grid-cols-4 gap-2 items-center text-xl text-start">
          <div className="flex justify-center">
            <span className="font-semibold">Shift type:</span>
            <span className="ml-2">{typeId === 1 ? "Setup" : "Host"}</span>
          </div>
          <div className="flex justify-center">
            <span className="font-semibold">Date:</span>
            <span className="ml-2">{date}</span>
          </div>
          <div>
            <span className="font-semibold">Time:</span>
            <span className="ml-2">{timeRange}</span>
          </div>
          <div className="flex justify-center">
            <button className="btn">Remove Shift</button>
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
