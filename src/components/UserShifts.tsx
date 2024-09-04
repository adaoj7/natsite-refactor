import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

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
    return <div>No shifts found</div>;
  }

  const userShifts = data.data.map((shift: Shift) => {
    const { date, timeRange, typeId, availabilityId, shiftId } = shift;

    return (
      <li className="">
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
