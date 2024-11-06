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
import { z } from "zod";
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

type initialValues = {
  checked: string[];
  finalChecked: valuesAndAmount[];
};

interface valuesAndAmount {
  shiftId: number;
  amount: number;
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
              shiftType,
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
            <Form onSubmit={handleSubmit} className="card-body pt-0">
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
  const [nextChecked, setNextChecked] = useState<string[]>([]);
  const [initialSelect, setInitialSelect] = useState<boolean>(false);

  const shiftValidationSchema = z.object({
    checked: z
      .array(z.string())
      .min(1, { message: "Please select at least one shift" }),
  });

  return (
    <div className="flex flex-col">
      <div className="card mx-auto flex">
        <Formik
          initialValues={
            {
              checked: [],
              finalChecked: [],
            } as initialValues
          }
          validate={(values) => {
            try {
              shiftValidationSchema.parse(values);
              return {};
            } catch (error) {
              if (error instanceof z.ZodError) {
                return { checked: error.errors[0].message };
              }
              return {};
            }
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const bodyObj = {
              userId,
              checked: values.checked,
              shiftType,
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
            console.log("values", values);
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal();
            // handleSubmit();

            // @ts-expect-error - props don't match
            resetForm({ checked: [] });
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Form onSubmit={handleSubmit} className="card-body pt-0">
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
                {!initialSelect ? (
                  <>
                    <Dates days={shiftData.data} userShifts={userShifts} />
                    <div>
                      {errors.checked ? (
                        <p className="text-red-500">{errors.checked}</p>
                      ) : (
                        <p className="text-white">Easter Egg</p>
                      )}
                      <div className="mt-4 flex justify-center">
                        <Button
                          name="Next"
                          type="button"
                          onClick={() => {
                            if (values.checked.length === 0) {
                              errors.checked =
                                "Please select at least one shift";
                              return;
                            }
                            console.log("pendingValues", values.checked);
                            setNextChecked(values.checked);
                            setInitialSelect(!initialSelect);
                          }}
                          className="md:w-96 btn-secondary"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p>Please confirm your selections:</p>
                    <Confirm nextChecked={nextChecked} />
                    <div className="mt-8 flex justify-center gap-4">
                      <Button
                        name="Back"
                        type="button"
                        onClick={() => setInitialSelect(!initialSelect)}
                        className="md:w-96 btn-secondary"
                      />
                      <Button
                        name="Submit"
                        type="submit"
                        className="md:w-96 btn-secondary"
                      />
                    </div>
                  </div>
                )}
              </ul>
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

function Confirm({ nextChecked }: { nextChecked: string[] }) {
  const [finalChecked, setFinalChecked] = useState<valuesAndAmount[]>([]);

  const nextCheckedIds = nextChecked
    .map((shift) => parseInt(shift))
    .sort((a, b) => a - b);
  const nextCheckedIdsString = nextCheckedIds.join(",");

  //modify this query so that it also send back the total availabilty for each shift to then filter the options
  const { data, isPending } = useQuery({
    queryKey: ["selectedShifts", nextCheckedIdsString],
    queryFn: async () => {
      const response = await axios.get("/api/selectedShifts", {
        params: { shiftIds: nextCheckedIds },
      });
      return response;
    },
  });

  console.log(data?.data);

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="flex flex-wrap gap-12">
      {data?.data.map((shift: any) => (
        <li key={shift.day}>
          <h1 className="font-semibold">{shift.day}</h1>
          <ul className="flex flex-col gap-2">
            {shift.shifts.map((shift: any) => (
              <div key={shift.timeRange}>
                <input type="hidden" />
                <label className="flex select-none items-center font-normal">
                  <Field
                    component="select"
                    name="finalChecked"
                    className="w-full rounded-md border-[1px] border-gray-300"
                  >
                    <option value={[shift.shiftId, 1]}>1</option>
                    <option value={[shift.shiftId, 2]}>2</option>
                    <option value={[shift.shiftId, 3]}>3</option>
                  </Field>
                  <div>{shift.timeRange}</div>
                </label>
              </div>
            ))}
          </ul>
        </li>
      ))}
    </div>
  );
}
