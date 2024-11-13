import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

interface Shift {
  date: string;
  timeRange: string;
  typeId: number;
  availabilityId: number;
  shiftId: number;
  dayOfWeek: string;
}

export default function UserShifts() {
  const userId = useSelector((state: any) => state.userId);
  const [isShiftId, setIsShiftId] = useState<number | null>(null);
  const [_, setIsSignupCount] = useState<number | null>(null);
  const [signupCount, setSignupCount] = useState<number[]>([]);

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
      availabilityId: number[];
      typeId: number;
    }) => {
      return axios.delete("/api/deleteShift", {
        data,
      });
    },
    onSettled: () => {
      refetchUserShifts();
      (
        document.querySelector(
          `dialog[id="user_shifts_modal_${isShiftId}"]`
        ) as HTMLDialogElement
      )?.close();
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
      <div className="flex flex-col gap-4" key={typeId}>
        <div>
          <h2 className="px-4 text-2xl font-bold desktop:px-0">
            {typeId === 1 ? "Setup" : "Host"}
          </h2>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          {Array.from(
            new Map(
              data.data
                .filter((shift: Shift) => shift.typeId === typeId)
                .map((shift: Shift) => [shift.shiftId, shift])
            ).values()
          ).map((shift: unknown) => {
            const {
              date,
              timeRange,
              typeId,
              availabilityId,
              shiftId,
              dayOfWeek,
            } = shift as Shift;
            const duplicateCount = data.data.filter(
              (s: Shift) => s.shiftId === shiftId
            ).length;

            const filteredSignups = data.data.filter(
              (shift: Shift) =>
                shift.typeId === typeId &&
                shift.shiftId === shiftId &&
                duplicateCount >= 1
            );

            const signupsDelete: number[] = [];
            const availabilityIds: number[] = [];
            availabilityIds.push(availabilityId);

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
                    <span>Day: </span>
                    <span className="whitespace-nowrap font-semibold">
                      {dayOfWeek}
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
                  <div>
                    <span>Signups: </span>
                    <span className="whitespace-nowrap font-semibold">
                      {duplicateCount}
                    </span>
                  </div>
                  {duplicateCount <= 1 ? (
                    <button
                      className="btn flex"
                      onClick={() =>
                        mutateAsync({
                          availabilityId: availabilityIds,
                          shiftId,
                          typeId,
                        })
                      }
                    >
                      Remove Shift
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary flex"
                      onClick={() => {
                        if (shiftId) {
                          (
                            document.getElementById(
                              `user_shifts_modal_${shiftId}`
                            ) as HTMLDialogElement
                          ).showModal();
                        }
                      }}
                    >
                      View Shifts
                    </button>
                  )}
                </div>
                {duplicateCount >= 1 && (
                  <dialog id={`user_shifts_modal_${shiftId}`} className="modal">
                    <div className="modal-box">
                      <h3 className="flex justify-center text-center text-2xl font-bold">
                        {typeId === 1 ? "Setup" : "Host"} from {timeRange} on{" "}
                        {dayOfWeek} - {date}
                      </h3>
                      <div className="my-4 flex justify-center text-lg">
                        Select how many shifts you would like to delete
                      </div>
                      <div className="my-2 flex flex-row items-center justify-center gap-4">
                        <select
                          name="signupCount"
                          onChange={(e) =>
                            setSignupCount(
                              e.target.value.split(",").map(Number)
                            )
                          }
                          id="signupCount"
                          className="rounded-md border-[1px] border-gray-300"
                        >
                          <option value={0}>Please Select</option>
                          {filteredSignups.map(
                            (shift: Shift, index: number) => {
                              signupsDelete.push(shift.availabilityId);
                              return (
                                <option
                                  value={signupsDelete.toString()}
                                  key={index}
                                >
                                  {index + 1}
                                </option>
                              );
                            }
                          )}
                        </select>
                        <button
                          className="btn"
                          onClick={() => {
                            setIsSignupCount(filteredSignups.length);
                            setIsShiftId(shiftId);
                            mutateAsync({
                              availabilityId: signupCount,
                              shiftId,
                              typeId,
                            });
                          }}
                        >
                          Remove Shift
                        </button>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                )}
              </li>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="card">
        <ul className="card-body list-none flex-col flex-wrap">{userShifts}</ul>
      </div>
    </>
  );
}
