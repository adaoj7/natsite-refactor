import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

interface DateOptionProps {
  dates: Shifts[];
}
interface ShiftOptionProps {
  formValues: ShiftLookupForm;
  data: Shifts[];
}

interface QueryResultsProps {
  values: any;
}

type Shifts = {
  date: string;
  dayOfWeek: string;
  shifts: Shift[];
};

type Shift = {
  dateId: string;
  date: string;
  timeRange: string;
};

type ShiftLookupForm = {
  date: string;
  time: string;
  data: string;
};

type ShiftFormProps = {
  volunteersAvail: any[];
  setVolunteersAvail: (volunteersAvail: any[]) => void;
  showResults: boolean;
  setShowResults: (showResults: boolean) => void;
  data: any;
  isLoading: boolean;
};

export const ShiftLookup = () => {
  const [volunteersAvail, setVolunteersAvail] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const getShifts = async () => {
    const res = await axios.get("/api/adminQuery");
    return res.data[0];
  };
  const { data, isLoading } = useQuery({
    queryKey: ["shifts"],
    queryFn: () => getShifts(),
  });

  return (
    <div className="mx-auto">
      <div className="desktop:hidden">
        <ShiftFormMobile
          volunteersAvail={volunteersAvail}
          setVolunteersAvail={setVolunteersAvail}
          showResults={showResults}
          setShowResults={setShowResults}
          data={data}
          isLoading={isLoading}
        />
      </div>
      <div className="hidden w-[850px] desktop:block">
        <ShiftFormDesktop
          volunteersAvail={volunteersAvail}
          setVolunteersAvail={setVolunteersAvail}
          showResults={showResults}
          setShowResults={setShowResults}
          data={data}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const ShiftFormMobile: React.FC<ShiftFormProps> = ({
  volunteersAvail,
  setVolunteersAvail,
  showResults,
  setShowResults,
  data,
  isLoading,
}) => {
  if (isLoading)
    return <div className="mt-8 flex justify-center">Loading...</div>;

  return (
    <div className="ml-auto">
      <Formik<ShiftLookupForm>
        initialValues={{
          date: "",
          time: "",
          data: "",
        }}
        onSubmit={async (values) => {
          const sendQuery = async () => {
            const bodyObj = {
              date: values.date,
              time: values.time,
            };
            try {
              const { data } = await axios.post("/api/adminQuery", bodyObj);
              if (data) {
                setVolunteersAvail(data);
                setShowResults(true);
              } else {
                console.log("No data returned");
                setShowResults(false);
              }
            } catch (err) {
              console.log(err);
            }
          };
          setShowResults(false);
          await sendQuery();
        }}
      >
        {({ values }) => (
          <Form className="card">
            <div className="card-body">
              <h1 className="card-title text-3xl">Search Shifts</h1>
              <div className="flex flex-col">
                <DateOptions dates={data.days} />
                <ShiftOptions formValues={values} data={data.days} />
              </div>
              <div className="mt-4 flex justify-center">
                <button type="submit" className="btn font-semibold">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {showResults && <QueryResults values={volunteersAvail} />}
    </div>
  );
};

const ShiftFormDesktop: React.FC<ShiftFormProps> = ({
  volunteersAvail,
  setVolunteersAvail,
  showResults,
  setShowResults,
  data,
  isLoading,
}) => {
  if (isLoading)
    return <div className="mt-8 flex justify-center">Loading...</div>;

  return (
    <div className="ml-auto">
      <Formik<ShiftLookupForm>
        initialValues={{
          date: "",
          time: "",
          data: "",
        }}
        onSubmit={async (values) => {
          const sendQuery = async () => {
            const bodyObj = {
              date: values.date,
              time: values.time,
            };
            try {
              const { data } = await axios.post("/api/adminQuery", bodyObj);
              if (data) {
                setVolunteersAvail(data);
                setShowResults(true);
              } else {
                console.log("No data returned");
                setShowResults(false);
              }
            } catch (err) {
              console.log(err);
            }
          };
          setShowResults(false);
          await sendQuery();
        }}
      >
        {({ values }) => (
          <Form className="card mx-auto w-[400px]">
            <div className="card-body">
              <h1 className="card-title text-3xl">Search Shifts</h1>
              <div className="flex flex-col">
                <DateOptions dates={data.days} />
                <ShiftOptions formValues={values} data={data.days} />
              </div>
              <div className="mt-4 flex justify-center">
                <button type="submit" className="btn font-semibold">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {showResults && <QueryResults values={volunteersAvail} />}
    </div>
  );
};

const DateOptions: React.FC<DateOptionProps> = ({ dates }) => {
  const dateMap = dates.map((ele, i) => {
    const shifts = ele.shifts.map((ele) => ele);
    if (shifts.length > 0) {
      return (
        <option value={ele.date} key={i}>
          {ele.dayOfWeek}, {ele.date}
        </option>
      );
    }
  });
  return (
    <Field
      name="date"
      component="select"
      className="mb-4 rounded-md border-[1px] border-gray-300"
    >
      <option key="random">Select a Date</option>
      {dateMap}
    </Field>
  );
};

const ShiftOptions: React.FC<ShiftOptionProps> = ({ formValues, data }) => {
  const { date } = formValues;
  let times: any[] = [];
  const timesOnDate = data.filter((e) => e.date === date);
  times = timesOnDate[0]?.shifts.map((ele, i) => {
    return (
      <option value={ele.timeRange} key={i}>
        {ele.timeRange}
      </option>
    );
  });
  return (
    <div key={date}>
      <Field
        name="time"
        component="select"
        className="w-full rounded-md border-[1px] border-gray-300"
      >
        <option key="random">Select a Time</option>
        {times}
      </Field>
    </div>
  );
};

const QueryResults: React.FC<QueryResultsProps> = ({ values }) => {
  const { volunteersAvail } = values;
  let emailString = "";
  volunteersAvail
    ?.map((ele: any) => {
      emailString += `${ele.email},`;
    })
    .slice(0, -1);

  console.log("emailList", emailString);

  const volunteerList = volunteersAvail?.map((ele: any, i: any) => {
    let availabilities;
    if (ele.availabilities) {
      availabilities = ele.availabilities;
    } else if (ele.dummy_availabilities) {
      availabilities = ele.dummy_availabilities;
    } else {
      console.log("No availabilities found");
    }

    return (
      <div key={i} className="my-2 grid phone:grid-cols-1 desktop:grid-cols-4">
        <div className="flex phone:justify-start phone:font-semibold desktop:justify-start desktop:font-normal">
          {ele.name}
        </div>
        <div className="flex phone:justify-start desktop:justify-start">
          {ele.email}
        </div>
        <div className="flex phone:justify-start desktop:justify-end">
          {ele.phone}
        </div>
        <div className="flex phone:justify-start desktop:justify-end">
          Signups:{" "}
          {availabilities && availabilities.length
            ? availabilities.length
            : "0"}
        </div>
      </div>
    );
  });

  return (
    <>
      {volunteerList?.length > 0 ? (
        <div className="card">
          <div className="card-body">
            <div>
              <div className="">
                <div className="card-title">Volunteers</div>
                <div className="">{volunteerList}</div>
              </div>
              <div className="card-actions mt-6 flex justify-center">
                <button
                  className="btn"
                  onClick={() =>
                    //@ts-expect-error window is not defined
                    (window.location = `mailto:?cc=${emailString}`)
                  }
                >
                  Email This List
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">No volunteers found</div>
        </div>
      )}
    </>
  );
};

export default ShiftLookup;
