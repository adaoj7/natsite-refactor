import React, { Suspense } from "react";
import Spacer from "../components/Spacer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { default as PhoneInput } from "react-phone-number-input/input";
import { Formik, Form, Field } from "formik";
import { E164Number } from "libphonenumber-js/core";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Flex from "../components/Flex";

interface User {
  name: string;
  phone: string;
  church: string;
}

const User: React.FC = () => {
  const { logout } = useAuth0();
  const [isEditing, setIsEditing] = React.useState(false);
  const [phoneValue, setPhoneValue] = React.useState<
    E164Number | string | undefined
  >("");
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return await response.data;
    },
    retry: true,
  });

  const { isSuccess, isPending, mutate, mutateAsync } = useMutation({
    mutationFn: (updatedUser: User) => {
      return axios.post("/api/updateUser", updatedUser);
    },
  });

  const logoutServer = async () => {
    await axios.delete("/api/logout");
    logout();
  };

  return (
    <>
      <Spacer />
      {isEditing ? (
        <div className="h-96 flex justify-center items-center">
          <div className="card bg-secondary w-96 shadow-xl">
            <div className="card-body">
              <p className="card-title">Editing!</p>
              <Formik
                initialValues={{
                  name: data?.name,
                  phone: data?.phone,
                  church: data?.church,
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  values.phone = phoneValue;
                  console.log("values", values);
                  await mutateAsync(values);
                  setSubmitting(false);
                  while (!isSuccess) {
                    await new Promise((resolve) => setTimeout(resolve, 100)); // Check every 100ms
                  }
                  if (isSuccess) {
                    setIsEditing(false);
                  }
                }}
              >
                {({ values, handleChange }) => (
                  <Form className="">
                    <Field
                      name="name"
                      placeholder="Enter name"
                      className="focus:outline-none border-2 border-black rounded-md h-full bg-white w-full p-2"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <PhoneInput
                      className="focus:outline-none border-2 border-black rounded-md h-full bg-white w-full p-2"
                      placeholder="Enter phone number"
                      country="US"
                      smartCaret={true}
                      value={values.phone}
                      onChange={setPhoneValue}
                      //might need to validate for length
                    />
                    <Field
                      name="church"
                      placeholder="Enter church"
                      className="focus:outline-none border-2 border-black rounded-md h-full bg-white w-full p-2"
                      value={values.church}
                      onChange={handleChange}
                    />
                    <button type="submit" className="btn">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
              <button onClick={() => setIsEditing(false)} className="btn">
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-96 flex justify-center items-center">
          <div className="card bg-secondary w-96 shadow-xl">
            <div className="card-body">
              <p className="card-title">Not Editing!</p>
              <div className="card-actions flex-col justify-between">
                {data && (
                  <ul>
                    <li>Name: {data.name}</li>
                    <li>Email: {data.email}</li>
                    <li>Phone: {data.phone ? data.phone : "N/A"}</li>
                    <li>Church: {data.church ? data.church : "N/A"}</li>
                  </ul>
                )}
                <Flex className="w-full gap-2" direction="col">
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button onClick={() => logoutServer()} className="btn">
                    Logout
                  </button>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
