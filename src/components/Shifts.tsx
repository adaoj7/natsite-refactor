import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Button from "./Button";
interface Shift {
  shiftType: "setup" | "host";
}

export default function Shifts({ shiftType }: Shift) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["shifts"],
    queryFn: async () => {
      const response = await fetch(`/api/${shiftType}`);
      return await response.json();
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <Formik
        initialValues={{ checked: [] }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);
        }}
      >
        {({ errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ul role="group" aria-labelledby="checkbox-group">
              <Dates days={data} />
            </ul>
            <Button name="Submit" />
          </Form>
        )}
      </Formik>
    </>
  );
}

function Dates({ days }) {
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

function Shift({ day }) {
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
