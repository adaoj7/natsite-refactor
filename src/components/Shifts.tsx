// import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Button from "./Button";
import axios from "axios";
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

export default function Shifts({ shiftType }: ShiftOptions) {
  const { isPending, error, data } = useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const response = await fetch(`/api/${shiftType}`);
      return await response.json();
    },
  });
  // Build this once I have logins working
  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(`/api/${shiftType}`, { data });
    },
  });
  console.log(mutation);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="flex ">
      <Formik
        initialValues={{ checked: [] }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
          setSubmitting(false);
          // @ts-ignore
          resetForm({ checked: [] });
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ul role="group" aria-labelledby="checkbox-group">
              <Dates days={data} />
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
          <>
            <h2>{day.date}</h2>
            <Shift day={day} />
          </>
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
          <>
            <h3>{shift.time}</h3>
            <input type="hidden" />
            <label>
              <Field
                type="checkbox"
                name="checked"
                value={shift.shiftId.toString()}
                key={shift.shiftId.toString()}
              />
              {shift.timeRange}
            </label>
          </>
        );
      })}
    </>
  );
}
