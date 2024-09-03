// import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Button from "./Button";
import axios from "axios";
import { useSelector } from "react-redux";
interface ShiftOptions {
  shiftType: "setup" | "host";
}
interface Day {
  date: string;
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

export default function Shifts({ shiftType }: ShiftOptions) {
  const userId = useSelector((state: any) => state.userId);
  const {
    isPending: isPendingShifts,
    error: errorShifts,
    data: shiftData,
    refetch: refetchShifts,
  } = useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const response = await axios.get(`/api/${shiftType}`);
      console.log("response", response);
      return response;
    },
  });
  const {
    isError: errorUserShifts,
    isPending: isPendingUserShifts,
    data: volunteerData,
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
    mutationFn: (data: initialValues) => {
      return axios.post("/api/volunteer", data);
    },
    onSettled: () => {
      console.log("onSettled");
      refetchShifts();
      refetchUserShifts();
    },
  });

  console.log("shift data", shiftData);
  console.log("volunteer data", volunteerData);

  if (isPendingShifts || isPendingUserShifts) return <p>Loading...</p>;
  if (errorShifts || errorUserShifts) return <p>Error</p>;

  return (
    <div className="flex card bg-secondary w-96">
      <Formik
        initialValues={{ checked: [] } as initialValues}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const bodyObj = {
            userId,
            checked: values.checked,
          };
          mutateAsync(bodyObj);
          console.log(bodyObj);
          // setSubmitting(false);
          // @ts-ignore
          // resetForm({ checked: [] });
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="card-body">
            <ul role="group" aria-labelledby="checkbox-group">
              <Dates days={shiftData.data} />
            </ul>
            <Button name="Submit" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

function Dates({ days }: { days: Day[] }) {
  return (
    <>
      {days.map((day) => {
        return (
          <div key={day.date}>
            <h2 className="text-black">{day.date}</h2>
            <Shift day={day} />
          </div>
        );
      })}
    </>
  );
}

function Shift({ day }: { day: Day }) {
  return (
    <>
      {day.shifts.map((shift) => {
        return (
          <div key={shift.timeRange}>
            <h3>{shift.time}</h3>
            <input type="hidden" />
            <label className="text-black">
              <Field
                type="checkbox"
                name="checked"
                value={shift.shiftId.toString()}
                key={shift.shiftId.toString()}
              />
              {shift.timeRange}
            </label>
          </div>
        );
      })}
    </>
  );
}
