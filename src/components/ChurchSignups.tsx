import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface ChurchSignupsProps {
  churchVolunteers: any;
  isLoading: boolean;
}

const ChurchSignups: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["churchVolunteers"],
    queryFn: () => axios.get("/api/getAllChurchVolunteers"),
  });
  const churchVolunteers = data?.data;

  return (
    <div className="">
      <div className="desktop:hidden">
        <ChurchSignupsMobile
          churchVolunteers={churchVolunteers}
          isLoading={isLoading}
        />
      </div>
      <div className="hidden desktop:block">
        <ChurchSignupsDesktop
          churchVolunteers={churchVolunteers}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const ChurchSignupsMobile: React.FC<ChurchSignupsProps> = ({
  churchVolunteers,
  isLoading,
}) => {
  console.log("churchVolunteers", churchVolunteers);

  if (isLoading) {
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-3xl">Church Signups</h1>
          <div>Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-3xl">Church Signups</h1>
        <ul>
          {churchVolunteers.map((church: any) => {
            return (
              <li key={church.churchId} className="flex flex-col gap-2 py-2">
                <div className="truncate">{church.churchName}</div>
                <div className="">
                  Volunteers:{" "}
                  <span className="font-semibold">{church.count}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const ChurchSignupsDesktop: React.FC<ChurchSignupsProps> = ({
  churchVolunteers,
  isLoading,
}) => {
  console.log("churchVolunteers", churchVolunteers);

  if (isLoading) {
    return (
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-3xl">Church Signups</h1>
          <div>Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title text-3xl">Church Signups</h1>
        <div className="grid grid-cols-2">
          {churchVolunteers.map((church: any) => {
            return (
              <div
                key={church.churchId}
                className="flex justify-between px-8 py-4 w-[550px] overflow-x-auto"
              >
                <h2 className="whitespace-nowrap">{church.churchName}</h2>
                <div className="whitespace-nowrap w-36">
                  Volunteers:{" "}
                  <span className="font-semibold">{church.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChurchSignups;
