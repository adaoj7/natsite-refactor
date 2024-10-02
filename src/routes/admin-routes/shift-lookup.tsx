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

export const ShiftLookup = () => {
  return (
    <div className="mx-auto">
      <div className="desktop:hidden">
        <ShiftFormMobile />
      </div>
      <div className="hidden desktop:block w-[650px]">
        <ShiftFormDesktop />
      </div>
    </div>
  );
};

const ShiftFormMobile: React.FC = () => {
  return <div>Hello There</div>;
};

const ShiftFormDesktop: React.FC = () => {
  const [volunteersAvail, setVolunteersAvail] = useState<any[]>([]);
  const getShifts = async () => {
    const res = await axios.get("/api/adminQuery");
    return res.data[0];
  };
  const { data, isLoading } = useQuery({
    queryKey: ["shifts"],
    queryFn: () => getShifts(),
  });
  if (isLoading)
    return <div className="flex justify-center mt-8">Loading...</div>;
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
            const { data } = await axios.post("/api/adminQuery", bodyObj);
            if (!data.error) {
              setVolunteersAvail(data);
            } else {
              console.log(data.error);
            }
          };
          sendQuery();
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
              <div className="flex justify-center mt-4">
                <button type="submit" className="btn font-semibold ">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <QueryResults values={volunteersAvail} />
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
      className="border-[1px] border-gray-300 rounded-md mb-4"
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
        className="border-[1px] border-gray-300 rounded-md w-full"
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
  const emailList = volunteersAvail
    ?.map((ele: any) => {
      return (emailString += `${ele.email},`);
    })
    .slice(0, -1);

  const volunteerList = volunteersAvail?.map((ele: any, i: any) => {
    return (
      <div key={i} className="grid grid-cols-3 my-2">
        <div className="flex justify-start">{ele.name}</div>
        <div className="flex justify-start">{ele.email}</div>
        <div className="flex justify-end">{ele.phone}</div>
      </div>
    );
  });

  return (
    <>
      {volunteerList && (
        <div className="card">
          <div className="card-body">
            <div>
              <div className="">
                <div className="card-title">Volunteers</div>
                <div className="">{volunteerList}</div>
              </div>
              <div className="flex justify-center mt-6 card-actions">
                <button
                  className="btn"
                  onClick={() =>
                    //@ts-expect-error window is not defined
                    (window.location = `mailto:?cc=${emailList}`)
                  }
                >
                  Email This List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShiftLookup;
