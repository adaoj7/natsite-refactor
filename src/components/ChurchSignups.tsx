import React from "react";

interface ChurchSignupsProps {}

const ChurchSignups: React.FC<ChurchSignupsProps> = () => {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["churchVolunteers"],
  //   queryFn: () => axios.get("/api/getAllChurchVolunteers"),
  // });
  const isLoading = true;
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
        <div></div>
      </div>
    </div>
  );
};

export default ChurchSignups;
