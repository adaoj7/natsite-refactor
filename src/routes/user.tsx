import React, { Suspense, useEffect } from "react";
import Spacer from "../components/Spacer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { default as PhoneInput } from "react-phone-number-input/input";
import { Formik, Form, Field } from "formik";
import { E164Number } from "libphonenumber-js/core";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Flex from "../components/Flex";
import { useDispatch } from "react-redux";

interface User {
  name: string;
  phone: string | E164Number | undefined;
  church: string;
}
interface UserFormProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  refetch: () => void;
}

export default function User() {
  const { logout } = useAuth0();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return await response.data;
    },
    retry: true,
  });
  const user = data;

  const logoutServer = async () => {
    await axios.delete("/api/logout");
    logout();
  };

  return (
    <>
      <Spacer />
      {isEditing ? (
        <UserForm setIsEditing={setIsEditing} refetch={refetch} user={user} />
      ) : (
        <div className="flex justify-center items-center">
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
                  {/* I need to make this a modal to confirm the logout */}
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
}

function UserForm({ setIsEditing, user, refetch }: UserFormProps) {
  const [phoneValue, setPhoneValue] = React.useState<
    E164Number | string | undefined
  >("");

  const dispatch = useDispatch();

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedUser: User) => {
      const mutation = await axios.post("/api/updateUser", updatedUser);
      return mutation;
    },
    onSettled: ({ data }: any) => {
      refetch();
      dispatch({ type: "UPDATE", payload: data });
    },
  });

  useEffect(() => {
    setPhoneValue(user.phone);
  }, [user.phone]);

  async function handleSubmit(values: User) {
    values.phone = phoneValue;
    await mutateAsync(values);
    setPhoneValue(values.phone);
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="card bg-secondary w-96 shadow-xl">
          <div className="card-body">
            <p className="card-title">Editing!</p>
            <Formik
              initialValues={{
                name: user?.name,
                phone: user?.phone,
                church: user?.church,
              }}
              onSubmit={async (values) => {
                handleSubmit(values);
              }}
            >
              {({ values, handleChange }) => (
                <Form className="[&>*]:my-2">
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
                  <div className="w-full flex gap-2">
                    <button type="submit" className="btn flex-grow">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn btn-success flex-grow"
                    >
                      Save
                    </button>
                  </div>
                  <div className="flex w-full">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn flex-grow"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
