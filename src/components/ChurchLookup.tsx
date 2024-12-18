﻿import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

type ChurchLookupProps = {
  churches: Church[];
  showResults: boolean;
  setShowResults: (showResults: boolean) => void;
  churchVolunteers: any[];
  setChurchVolunteers: (churchVolunteers: any[]) => void;
  isLoading: boolean;
};

interface Church {
  churchId: number;
  churchName: string;
  count: number;
}

export default function ChurchLookup() {
  const [churchVolunteers, setChurchVolunteers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { data: churches, isLoading } = useQuery({
    queryKey: ["churches"],
    queryFn: async () => {
      const res = await axios.get("/api/getAllChurchVolunteers");
      return res.data;
    },
  });

  return (
    <>
      <div className="mx-auto desktop:hidden">
        <ChurchLookupMobile
          churches={churches}
          showResults={showResults}
          setShowResults={setShowResults}
          churchVolunteers={churchVolunteers}
          setChurchVolunteers={setChurchVolunteers}
          isLoading={isLoading}
        />
      </div>
      <div className="mx-auto hidden w-[850px] desktop:flex">
        <ChurchLookupDesktop
          churches={churches}
          showResults={showResults}
          setShowResults={setShowResults}
          churchVolunteers={churchVolunteers}
          setChurchVolunteers={setChurchVolunteers}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export function ChurchLookupMobile({
  churches,
  showResults,
  setShowResults,
  churchVolunteers,
  setChurchVolunteers,
  isLoading,
}: ChurchLookupProps) {
  if (isLoading) {
    return <div className="mx-auto mt-8 flex justify-center">Loading...</div>;
  }

  return (
    <div className="ml-auto">
      <Formik
        initialValues={{
          churchId: "",
        }}
        onSubmit={async (values) => {
          const sendQuery = async () => {
            const bodyObj = {
              churchId: values.churchId,
            };
            try {
              const { data } = await axios.post(
                "/api/getChurchVolunteers",
                bodyObj
              );
              setChurchVolunteers(data);
              setShowResults(true);
            } catch (err) {
              console.log(err);
            }
          };
          sendQuery();
        }}
      >
        <Form className="card">
          <div className="card-body">
            <h1 className="card-title text-3xl">Search Churches</h1>
            <ChurchOptions churches={churches} />
            <div className="flex justify-center">
              <button type="submit" className="btn font-semibold">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      {showResults && <QueryResults users={churchVolunteers} />}
    </div>
  );
}

export function ChurchLookupDesktop({
  churches,
  showResults,
  setShowResults,
  churchVolunteers,
  setChurchVolunteers,
  isLoading,
}: ChurchLookupProps) {
  if (isLoading) {
    return <div className="mx-auto mt-8 flex justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <Formik
        initialValues={{
          churchId: "",
        }}
        onSubmit={async (values) => {
          const sendQuery = async () => {
            const bodyObj = {
              churchId: values.churchId,
            };
            try {
              const { data } = await axios.post(
                "/api/getChurchVolunteers",
                bodyObj
              );
              setChurchVolunteers(data);
              setShowResults(true);
            } catch (err) {
              console.log(err);
            }
          };
          sendQuery();
        }}
      >
        <Form className="card mx-auto w-[400px]">
          <div className="card-body">
            <h1 className="card-title text-3xl">Search Churches</h1>
            <ChurchOptions churches={churches} />
            <div className="flex justify-center">
              <button type="submit" className="btn font-semibold">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      {showResults && <QueryResults users={churchVolunteers} />}
    </div>
  );
}

function ChurchOptions({ churches }: { churches: Church[] }) {
  const churchMap = churches?.map((church: Church) => {
    return <option value={church.churchId}>{church.churchName}</option>;
  });
  return (
    <Field
      name="churchId"
      component="select"
      className="mb-4 rounded-md border-[1px] border-gray-300"
    >
      <option value="">Select a church</option>
      {churchMap}
    </Field>
  );
}

function QueryResults({ users }: { users: any[] }) {
  if (!users || users.length === 0) {
    return <div className="mb-8 flex justify-center">No users found</div>;
  }

  const userArray = users.map((user, i) => {
    return (
      <div key={i} className="my-2 grid phone:grid-cols-1 desktop:grid-cols-4">
        <div className="flex phone:justify-start phone:font-semibold desktop:justify-start desktop:font-normal">
          {user.name}
        </div>
        <div className="flex phone:justify-start desktop:justify-start">
          {user.email}
        </div>
        <div className="flex phone:justify-start desktop:justify-end">
          {user.phone}
        </div>
        <div className="flex phone:justify-start desktop:justify-end">
          Signups: {user.availability}
        </div>
      </div>
    );
  });

  return (
    <div className="card-body pt-0">
      <div className="card-title">Volunteers</div>
      <div className="">{userArray}</div>
    </div>
  );
}
