﻿// import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Button from "./Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { helperFunctions } from "../helper-functions/helper-functions";
import { NavLink } from "react-router-dom";
import { useState } from "react";
interface ShiftOptions {
  shiftType: "setup" | "host";
  people: number;
}
interface Day {
  date: string;
  dayOfWeek: string;
  shifts: Shift[];
}

interface Shift {
  day: Day;
  time: string;
  timeRange: string;
  shiftId: number;
}

interface initialValues {
  checked: string[];
}

interface UserShift {
  date: string;
  timeRange: string;
  typeId: number;
  availabilityId: number;
  shiftId: number;
}

type UserShifts = {
  data: UserShift[] | [];
};

interface ShiftsProps {
  userId: string;
  capShiftType: string;
  shiftType: string;
  shiftData: any;
  userShifts: any;
  mutateAsync: any;
  isLoadingUserShifts: boolean;
  isPendingSubmit: boolean;
}

export default function Shifts({ shiftType }: ShiftOptions) {
  const [people, setPeople] = useState<number | null>(null);

  return (
    <>
      <select
        name="people"
        id="people"
        onChange={(e) => {
          if (e.target.value !== "How many people are you signing up?") {
            setPeople(parseInt(e.target.value));
          } else {
            setPeople(null);
          }
        }}
        className="w-[400px] rounded-md border-[1px] border-gray-300"
      >
        <option value="How many people are you signing up?">
          How many people are you signing up?
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      {people && <Signup shiftType={shiftType} people={people} />}
    </>
  );
}

function Signup({ shiftType, people }: ShiftOptions) {
  const userId = useSelector((state: any) => state.userId);
  const { capitalizeFirstLetter } = helperFunctions;

  const capShiftType = capitalizeFirstLetter(shiftType);
  const {
    isPending: isPendingShifts,
    error: errorShifts,
    data: shiftData,
    refetch: refetchShifts,
  } = useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const response = await axios.get(`/api/${shiftType}`);
      return response;
    },
  });

  const {
    isError: errorUserShifts,
    isPending: isPendingUserShifts,
    data: userShifts,
    refetch: refetchUserShifts,
    isLoading: isLoadingUserShifts,
  } = useQuery({
    queryKey: ["userShifts"],
    queryFn: async () => {
      const response = await axios.get(`/api/userShifts`, {
        params: { userId },
      });
      return response;
    },
  });

  const { mutateAsync, isPending: isPendingSubmit } = useMutation({
    mutationFn: (data: initialValues) => {
      return axios.post("/api/volunteer", data);
    },
    onSettled: () => {
      refetchShifts();
      refetchUserShifts();
    },
  });

  if (isPendingShifts || isPendingUserShifts) return <p>Loading...</p>;
  if (errorShifts || errorUserShifts) return <p>Error</p>;
  return (
    <>
      <div className="desktop:hidden">
        <PhoneShifts
          userId={userId}
          capShiftType={capShiftType}
          shiftType={shiftType}
          shiftData={shiftData}
          userShifts={userShifts}
          mutateAsync={mutateAsync}
          isLoadingUserShifts={isLoadingUserShifts}
          isPendingSubmit={isPendingSubmit}
        />
      </div>
      <div className="hidden desktop:flex">
        <DesktopShifts
          userId={userId}
          capShiftType={capShiftType}
          shiftType={shiftType}
          shiftData={shiftData}
          userShifts={userShifts}
          mutateAsync={mutateAsync}
          isLoadingUserShifts={isLoadingUserShifts}
          isPendingSubmit={isPendingSubmit}
        />
      </div>
    </>
  );
}

const PhoneShifts = ({
  userId,
  shiftType,
  shiftData,
  userShifts,
  mutateAsync,
  isLoadingUserShifts,
  isPendingSubmit,
}: ShiftsProps) => {
  return (
    <>
      <div className="card m-4 flex max-w-full flex-grow">
        <Formik
          initialValues={{ checked: [] } as initialValues}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const bodyObj = {
              userId,
              checked: values.checked,
            };

            async function handleSubmit() {
              const response = await mutateAsync(bodyObj);
              setSubmitting(false);
              if (response.status !== 200) {
                (
                  document.getElementById("my_modal_3") as HTMLDialogElement
                ).showModal();
              }
            }
            (
              document.getElementById("my_modal_1") as HTMLDialogElement
            ).showModal();
            handleSubmit();
            // @ts-expect-error - props don't match
            resetForm({ checked: [] });
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="card-body">
              <p className="flex min-h-8 justify-center">
                Please use this form to sign up for {shiftType} shifts during
                the festival.
              </p>{" "}
              {isLoadingUserShifts ?? <p>Loading...</p>}
              <ul
                role="group"
                aria-labelledby="checkbox-group"
                className="md:justify-around flex flex-grow flex-wrap gap-4"
              >
                <Dates days={shiftData.data} userShifts={userShifts} />
              </ul>
              <div className="mt-8 flex justify-center">
                <Button
                  name="Submit"
                  type="submit"
                  className="md:w-96 btn-secondary"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className="mb-4">
            Thank you for signing up as a volunteer for {shiftType} shifts
            during the festival.
          </p>
          {isPendingSubmit ? (
            <div className="btn btn-disabled btn-primary w-full">
              Submitting...
            </div>
          ) : (
            <NavLink
              to="/getInvolved/myShifts"
              className="btn btn-primary w-full"
            >
              Click here to see your shifts
            </NavLink>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <p>
            There was an error submitting your shifts. Please refresh the page
            and try again.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

const DesktopShifts = ({
  userId,
  shiftType,
  shiftData,
  userShifts,
  mutateAsync,
  isLoadingUserShifts,
  isPendingSubmit,
}: ShiftsProps) => {
  return (
    <div className="flex flex-col">
      <div className="card mx-auto flex">
        <Formik
          initialValues={{ checked: [] } as initialValues}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const bodyObj = {
              userId,
              checked: values.checked,
            };

            async function handleSubmit() {
              const response = await mutateAsync(bodyObj);
              setSubmitting(false);
              if (response.status !== 200) {
                (
                  document.getElementById("my_modal_4") as HTMLDialogElement
                ).showModal();
              }
            }
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal();
            handleSubmit();

            // @ts-expect-error - props don't match
            resetForm({ checked: [] });
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="card-body">
              <p className="flex min-h-8 justify-center">
                Please use this form to sign up for {shiftType} shifts during
                the festival.
              </p>{" "}
              {isLoadingUserShifts ?? <p>Loading...</p>}
              <ul
                role="group"
                aria-labelledby="checkbox-group"
                className="flex flex-grow flex-wrap gap-4 desktop:justify-around"
              >
                <Dates days={shiftData.data} userShifts={userShifts} />
              </ul>
              <div className="mt-8 flex justify-center">
                <Button
                  name="Submit"
                  type="submit"
                  className="md:w-96 btn-secondary"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <p className="mb-4">
            Thank you for signing up as a volunteer for {shiftType} shifts
            during the festival.
          </p>
          {isPendingSubmit ? (
            <div className="btn btn-disabled btn-primary w-full">
              Submitting...
            </div>
          ) : (
            <NavLink
              to="/getInvolved/myShifts"
              className="btn btn-primary w-full"
            >
              Click here to see your shifts
            </NavLink>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <p>
            There was an error submitting your shifts. Please refresh the page
            and try again.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

function Dates({ days, userShifts }: { days: Day[]; userShifts: any }) {
  return (
    <>
      {days?.map((day) => {
        return (
          <div
            key={day.date}
            className="mx-2 text-lg font-semibold desktop:w-[180px]"
          >
            <div className="my-1">
              {day.dayOfWeek}, {day.date}
            </div>
            <div className="">
              <Shift day={day} userShifts={userShifts} />
            </div>
          </div>
        );
      })}
    </>
  );
}

function Shift({ day, userShifts }: { day: Day; userShifts: UserShifts }) {
  const userShiftsArray = userShifts.data.map(
    (shift: UserShift) => shift.shiftId
  );

  const shifts = day.shifts.map((shift) => {
    if (!userShiftsArray.includes(shift.shiftId)) {
      return (
        <div key={shift.timeRange} className="">
          <input type="hidden" />
          <label className="flex select-none items-center font-normal">
            <Field
              type="checkbox"
              name="checked"
              value={shift.shiftId.toString()}
              className="checkbox-primary checkbox checkbox-sm mr-2 size-4 rounded-md bg-white"
            />
            {shift.timeRange}
          </label>
        </div>
      );
    }
  });
  return <>{shifts}</>;
}
