// import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";
import Button from "./Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { helperFunctions } from "../helper-functions/helper-functions";
import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
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
};

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
  initialSelect: boolean;
  setInitialSelect: Dispatch<SetStateAction<boolean>>;
  nextChecked: string[];
  setNextChecked: Dispatch<SetStateAction<string[]>>;
  shiftValidationSchema: z.ZodObject<any, any>;
}

export default function Shifts({ shiftType }: ShiftOptions) {
  const [nextChecked, setNextChecked] = useState<string[]>([]);
  const [initialSelect, setInitialSelect] = useState<boolean>(false);

  const shiftValidationSchema = z.object({
    checked: z
      .array(z.string())
      .min(1, { message: "Please select at least one shift" }),
  });

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
          initialSelect={initialSelect}
          setInitialSelect={setInitialSelect}
          nextChecked={nextChecked}
          setNextChecked={setNextChecked}
          shiftValidationSchema={shiftValidationSchema}
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
          initialSelect={initialSelect}
          setInitialSelect={setInitialSelect}
          nextChecked={nextChecked}
          setNextChecked={setNextChecked}
          shiftValidationSchema={shiftValidationSchema}
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
  initialSelect,
  setInitialSelect,
  nextChecked,
  setNextChecked,
  shiftValidationSchema,
}: ShiftsProps) => {
  return (
    <>
      <div className="flex flex-grow">
        <Formik
          initialValues={
            {
              checked: [],
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
            const finalChecked = Object.entries(values).filter(([key]) =>
              key.startsWith("finalChecked-")
            );
            const finalCheckedArray = finalChecked.map(([_, value]) =>
              String(value).split(" ")
            );

            const bodyObj = {
              shiftType,
              userId,
              checked: values.checked,
              finalChecked: finalCheckedArray,
            };

            async function handleSubmit() {
              const response = await mutateAsync(bodyObj);
              setSubmitting(false);
              if (response.status !== 200) {
                (
                  document.getElementById("my_modal_3") as HTMLDialogElement
                ).showModal();
              } else {
                setInitialSelect(!initialSelect);
              }
            }
            (
              document.getElementById("my_modal_1") as HTMLDialogElement
            ).showModal();
            handleSubmit();

            resetForm();
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Form onSubmit={handleSubmit} className="pt-0">
              {isLoadingUserShifts ?? <p>Loading...</p>}
              <ul
                role="group"
                aria-labelledby="checkbox-group"
                className="md:justify-around flex flex-grow flex-wrap gap-4"
              >
                {/* <Dates days={shiftData.data} userShifts={userShifts} /> */}
                {!initialSelect ? (
                  <div className="flex flex-col">
                    <p className="mb-4 flex min-h-8 justify-center">
                      Please use this form to sign up for {shiftType} shifts
                      during the festival.
                    </p>{" "}
                    <div className="md:justify-around flex flex-grow flex-wrap justify-center gap-4 pt-0">
                      <Dates days={shiftData.data} userShifts={userShifts} />
                    </div>
                    <div className="flex flex-col">
                      <div>
                        {errors.checked ? (
                          <p className="mt-4 flex justify-center text-red-500">
                            {errors.checked}
                          </p>
                        ) : (
                          <p className="mt-4 select-none text-white">
                            Easter Egg
                          </p>
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
                              setNextChecked(values.checked);
                              setInitialSelect(!initialSelect);
                            }}
                            className="md:w-96 btn-secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <p>
                        Please use the dropdown to select how many people you
                        would like to sign up for each shift.{" "}
                        <span className="italic">
                          If you have more than 10 people to sign up for any 1
                          shift please reach out to us at
                          peorianativities@gmail.com
                        </span>
                      </p>
                    </div>
                    <Confirm nextChecked={nextChecked} />
                    <div className="mt-8 flex justify-center gap-4">
                      <Button
                        name="Back"
                        type="button"
                        onClick={() => {
                          setInitialSelect(!initialSelect);
                        }}
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
  initialSelect,
  setInitialSelect,
  nextChecked,
  setNextChecked,
  shiftValidationSchema,
}: ShiftsProps) => {
  return (
    <div className="flex flex-col">
      <div className="card flex">
        <Formik
          initialValues={
            {
              checked: [],
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
            const finalChecked = Object.entries(values).filter(([key]) =>
              key.startsWith("finalChecked-")
            );
            const finalCheckedArray = finalChecked.map(([_, value]) =>
              String(value).split(" ")
            );

            const bodyObj = {
              shiftType,
              userId,
              checked: values.checked,
              finalChecked: finalCheckedArray,
            };

            async function handleSubmit() {
              const response = await mutateAsync(bodyObj);
              setSubmitting(false);
              if (response.status !== 200) {
                (
                  document.getElementById("my_modal_4") as HTMLDialogElement
                ).showModal();
              } else {
                setInitialSelect(!initialSelect);
              }
            }
            (
              document.getElementById("my_modal_2") as HTMLDialogElement
            ).showModal();
            handleSubmit();

            resetForm();
          }}
        >
          {({ handleSubmit, values, errors }) => (
            <Form onSubmit={handleSubmit} className="pt-0">
              {isLoadingUserShifts ?? <p>Loading...</p>}
              <ul
                role="group"
                aria-labelledby="checkbox-group"
                className="flex flex-grow flex-wrap gap-4 desktop:justify-around"
              >
                {!initialSelect ? (
                  <div className="flex flex-col">
                    <p className="mb-4 flex min-h-8 justify-center">
                      Please use this form to sign up for {shiftType} shifts
                      during the festival.
                    </p>{" "}
                    <div className="flex flex-row">
                      <Dates days={shiftData.data} userShifts={userShifts} />
                    </div>
                    <div className="flex flex-col">
                      <div>
                        {errors.checked ? (
                          <p className="mt-4 flex justify-center text-red-500">
                            {errors.checked}
                          </p>
                        ) : (
                          <p className="mt-4 select-none text-white">
                            Easter Egg
                          </p>
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
                              setNextChecked(values.checked);
                              setInitialSelect(!initialSelect);
                            }}
                            className="md:w-96 btn-secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-8">
                      <p>
                        Please use the dropdown to select how many people you
                        would like to sign up for each shift.{" "}
                        <span className="italic">
                          If you have more than 10 people to sign up for any 1
                          shift please reach out to us at
                          peorianativities@gmail.com
                        </span>
                      </p>
                    </div>
                    <Confirm nextChecked={nextChecked} />
                    <div className="mt-8 flex justify-center gap-4">
                      <Button
                        name="Back"
                        type="button"
                        onClick={() => {
                          setInitialSelect(!initialSelect);
                        }}
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
            <div className="">
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
  if (!userShifts?.data) {
    userShifts?.data?.map((shift: UserShift) => shift.shiftId);
  }
  // This is just to keep userShiftsArray in the file just in case I need to remove those values from the UI in the future

  const shifts = day.shifts?.map((shift) => {
    // if (!userShiftsArray.includes(shift.shiftId)) {
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
    // }
  });
  return <>{shifts}</>;
}

function Confirm({ nextChecked }: { nextChecked: string[] }) {
  const nextCheckedIds = nextChecked
    .map((shift) => parseInt(shift))
    .sort((a, b) => a - b);
  const nextCheckedIdsString = nextCheckedIds.join(",");

  const { data, isPending } = useQuery({
    queryKey: ["selectedShifts", nextCheckedIdsString],
    queryFn: async () => {
      const response = await axios.get("/api/selectedShifts", {
        params: { shiftIds: nextCheckedIds },
      });
      return response;
    },
  });

  if (isPending) return <p>Loading...</p>;

  if (!data?.data) return <p>No shifts found</p>;

  function options(shift: any) {
    const optionsArray = [];
    if (shift.availabilityCount > 10) {
      for (let i = 0; i < 10; i++) {
        optionsArray.push(
          <option value={[`${shift.shiftId} ${i + 1}`]} key={i + 1}>
            {i + 1}
          </option>
        );
      }
    } else {
      for (let i = 0; i < shift.availabilityCount; i++) {
        optionsArray.push(
          <option
            value={[`${shift.shiftId} ${i + 1}`]}
            key={(i + 1).toString()}
          >
            {i + 1}
          </option>
        );
      }
    }
    return optionsArray;
  }

  if (data?.data.length === 1) {
    return (
      <ul className="flex w-full justify-center">
        {data?.data.map((shift: any) => (
          <li key={shift.day} className="w-[298px]">
            <h1 className="font-semibold">{shift.day}</h1>
            <ul>
              {shift.shifts.map((shift: any) => (
                <div key={shift.timeRange}>
                  <input type="hidden" />
                  <label className="mt-2 flex justify-between">
                    <div>{shift.timeRange}</div>
                    <Field
                      component="select"
                      name={`finalChecked-${shift.shiftId}`}
                      className="rounded-md border-[1px] border-gray-300"
                    >
                      <option value="null" key={shift.shiftId}>
                        Select
                      </option>
                      {shift.availabilityCount > 0 && options(shift)}
                    </Field>
                  </label>
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-12 phone:grid-cols-1 phone:px-10 desktop:grid-cols-2 desktop:px-24">
      {data?.data.map((shift: any) => (
        <li key={shift.day} className="">
          <h1 className="font-semibold">{shift.day}</h1>
          <ul>
            {shift.shifts.map((shift: any) => (
              <div key={shift.timeRange}>
                <input type="hidden" />
                <label className="mt-2 flex justify-between">
                  <div>{shift.timeRange}</div>
                  <Field
                    component="select"
                    name={`finalChecked-${shift.shiftId}`}
                    className="rounded-md border-[1px] border-gray-300"
                  >
                    <option value="null" key={shift.shiftId}>
                      Select
                    </option>
                    {shift.availabilityCount > 0 && options(shift)}
                  </Field>
                </label>
              </div>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
