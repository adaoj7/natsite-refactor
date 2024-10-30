// import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Button from "./Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { helperFunctions } from "../helper-functions/helper-functions";
import { NavLink } from "react-router-dom";
interface ShiftOptions {
  shiftType: "setup" | "host";
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
}

export default function Shifts({ shiftType }: ShiftOptions) {
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

  const { mutateAsync } = useMutation({
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
}: ShiftsProps) => {
  return (
    <>
      <div className="card m-4 flex max-w-full flex-grow bg-secondary">
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
              if (response.status === 200) {
                (
                  document.getElementById("my_modal_1") as HTMLDialogElement
                ).showModal();
              }
            }
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
                  className="md:w-96 btn-primary"
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
          <NavLink
            to="/getInvolved/myShifts"
            className="btn btn-primary w-full"
          >
            Click here to see your shifts
          </NavLink>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
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
}: ShiftsProps) => {
  return (
    <>
      <div className="card mx-auto flex bg-secondary">
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
              if (response.status === 200) {
                (
                  document.getElementById("my_modal_2") as HTMLDialogElement
                ).showModal();
              }
            }
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
                  className="md:w-96 btn-primary"
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
          <NavLink
            to="/getInvolved/myShifts"
            className="btn btn-primary w-full"
          >
            Click here to see your shifts
          </NavLink>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
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
