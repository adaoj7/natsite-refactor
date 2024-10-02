// import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Button from "./Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { helperFunctions } from "../helper-functions/helper-functions";
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
      <div className="desktop:block hidden">
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
  capShiftType,
  shiftType,
  shiftData,
  userShifts,
  mutateAsync,
  isLoadingUserShifts,
}: ShiftsProps) => {
  return (
    <div className="flex card bg-secondary max-w-full flex-grow m-4">
      <Formik
        initialValues={{ checked: [] } as initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const bodyObj = {
            userId,
            checked: values.checked,
          };
          mutateAsync(bodyObj);
          setSubmitting(false);
          // @ts-expect-error - props don't match
          resetForm({ checked: [] });
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="card-body">
            <h2 className="card-header text-xl font-semibold flex justify-center">
              {capShiftType}
            </h2>
            <p className="flex justify-center min-h-8">
              Please use this form to sign up for {shiftType} shifts during the
              festival.
            </p>{" "}
            {isLoadingUserShifts ?? <p>Loading...</p>}
            <ul
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-wrap gap-4 flex-grow md:justify-around"
            >
              <Dates days={shiftData.data} userShifts={userShifts} />
            </ul>
            <div className="flex justify-center mt-8">
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
  );
};

const DesktopShifts = ({
  userId,
  capShiftType,
  shiftType,
  shiftData,
  userShifts,
  mutateAsync,
  isLoadingUserShifts,
}: ShiftsProps) => {
  return (
    <div className="flex card bg-secondary max-w-full flex-grow mx-auto">
      <Formik
        initialValues={{ checked: [] } as initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const bodyObj = {
            userId,
            checked: values.checked,
          };
          mutateAsync(bodyObj);
          setSubmitting(false);
          // @ts-expect-error - props don't match
          resetForm({ checked: [] });
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="card-body">
            <h2 className="card-header text-xl font-semibold flex justify-center">
              {capShiftType}
            </h2>
            <p className="flex justify-center min-h-8">
              Please use this form to sign up for {shiftType} shifts during the
              festival.
            </p>{" "}
            {isLoadingUserShifts ?? <p>Loading...</p>}
            <ul
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-wrap gap-4 flex-grow md:justify-around"
            >
              <Dates days={shiftData.data} userShifts={userShifts} />
            </ul>
            <div className="flex justify-center mt-8">
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
  );
};

function Dates({ days, userShifts }: { days: Day[]; userShifts: any }) {
  return (
    <>
      {days?.map((day) => {
        return (
          <div key={day.date} className="text-lg font-semibold mx-2">
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
          <label className="flex font-normal select-none items-center">
            <Field
              type="checkbox"
              name="checked"
              value={shift.shiftId.toString()}
              className="mr-2 checkbox size-4 checkbox-sm rounded-md bg-white checkbox-primary"
            />
            {shift.timeRange}
          </label>
        </div>
      );
    }
  });
  return <>{shifts}</>;
}
