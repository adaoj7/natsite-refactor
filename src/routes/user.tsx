import React, { useEffect } from "react";
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
  churchId: number | undefined;
}
interface UserFormProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  refetch: () => void;
}

export default function User() {
  const { logout } = useAuth0();
  const [isEditing, setIsEditing] = React.useState(false);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return await response.data;
    },
  });
  const user = data;

  const logoutServer = async () => {
    await axios.delete("/api/logout");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  if (isLoading)
    return (
      <>
        <Spacer />
        <div className="my-8">
          <div className="flex justify-center items-center">
            <div className="card bg-secondary w-96 shadow-xl mx-4">
              <div className="card-body">
                <p className="card-title">Profile:</p>
                <div className="card-actions flex-col justify-between">
                  <ul className="[&>*]:text-lg">
                    <li className="mb-3">Name: Loading...</li>
                    <li className="my-3">Email: Loading...</li>
                    <li className="my-3">Phone: Loading...</li>
                    <li className="my-3">Church: Loading...</li>
                  </ul>
                  <Flex className="w-full gap-2" direction="col">
                    <button className="btn btn-disabled">Edit</button>
                    <button className="btn btn-disabled">Logout</button>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Spacer />
      <div className="my-8">
        {isEditing ? (
          <UserForm setIsEditing={setIsEditing} refetch={refetch} user={user} />
        ) : (
          <div className="flex justify-center items-center">
            <div className="card bg-secondary w-96 shadow-xl mx-4">
              <div className="card-body">
                <p className="card-title">Profile:</p>
                <div className="card-actions flex-col justify-between">
                  {data && (
                    <ul className="[&>*]:text-lg">
                      <li className="mb-3">
                        Name: {data.name ? data.name : "N/A"}
                      </li>
                      <li className="my-3">Email: {data.email}</li>
                      <li className="my-3">
                        Phone: {data.phone ? data.phone : "N/A"}
                      </li>
                      <li className="my-3">
                        Church: {data.churchName ? data.churchName : "N/A"}
                      </li>
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
                    <button
                      onClick={() =>
                        (
                          document.getElementById(
                            "modal_desktop"
                          ) as HTMLDialogElement
                        )?.showModal()
                      }
                      className="btn"
                    >
                      Logout
                    </button>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <dialog id="modal_desktop" className="modal">
        <div className="modal-box desktop:w-1/3">
          <h3 className="card-title my-2">Logout from your account?</h3>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                onClick={() => logoutServer()}
                className="btn btn-primary"
              >
                Yes, log out
              </button>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
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

  const { data: churches, isLoading } = useQuery({
    queryKey: ["churches"],
    queryFn: async () => {
      const response = await axios.get("/api/churches");
      return await response.data;
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <div className="card bg-secondary w-96 shadow-xl mx-4">
          <div className="card-body">
            {" "}
            <p className="card-title">Edit Profile</p>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="card bg-secondary w-96 shadow-xl mx-4">
          <div className="card-body">
            <p className="card-title">Edit Profile</p>
            <Formik
              initialValues={{
                name: user?.name,
                phone: user?.phone,
                churchId: user?.churchId || "",
              }}
              onSubmit={async (values) => {
                // @ts-expect-error TS has issues with Formik and tanstack query mutations
                handleSubmit(values);
                setIsEditing(false);
              }}
            >
              {({ values, handleChange }) => (
                <Form className="">
                  <Field
                    name="name"
                    placeholder="Enter name"
                    className="focus:outline-none border-2 border-black rounded-md h-full bg-white w-full p-2 mb-2"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <PhoneInput
                    className="focus:outline-none border-2 border-black rounded-md h-full bg-white w-full p-2 my-2"
                    placeholder="Enter phone number"
                    country="US"
                    smartCaret={true}
                    value={values.phone}
                    onChange={setPhoneValue}
                    //might need to validate for length
                  />
                  <Field
                    name="churchId"
                    component="select"
                    placeholder="Enter church"
                    className="focus:outline-none border-2 border-black rounded-md h-full bg-white w-full p-2 my-2"
                    value={values.churchId}
                    onChange={handleChange}
                  >
                    <option key="random" value={""}>
                      Select a church
                    </option>
                    {churches?.map((church: any) => (
                      <option key={church.churchId} value={church.churchId}>
                        {church.churchName}
                      </option>
                    ))}
                  </Field>
                  <div className="w-full flex gap-2 my-2">
                    <button type="submit" className="btn btn-primary flex-grow">
                      Save{" "}
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
