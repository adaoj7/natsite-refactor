import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

type FormLinksProps = {
  formLinks: FormLink[];
  mutateAsync: any;
  isLoading: boolean;
};
interface FormLink {
  linkName: string;
  link: string;
  linkType: string;
}

export default function FormLinks() {
  const queryClient = useQueryClient();
  const { data: formLinks, isLoading } = useQuery({
    queryKey: ["formLinks"],
    queryFn: async () => {
      const response = await axios.get("/api/links");
      return response.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedFormLinks: FormLink[]) => {
      const mutation = await axios.post(
        "/api/updateFormLinks",
        updatedFormLinks
      );
      return mutation;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["formLinks"] });
    },
  });

  console.log(formLinks);

  return (
    <div className="mx-auto">
      {/* I need to change these components a bit so that they have an edit state so that people are less likely to change them on accident */}
      <div className="desktop:hidden">
        <FormLinksMobile
          formLinks={formLinks}
          mutateAsync={mutateAsync}
          isLoading={isLoading}
        />
      </div>
      <div className="hidden desktop:block">
        <FormLinksDesktop
          formLinks={formLinks}
          mutateAsync={mutateAsync}
          isLoading={isLoading}
        />
      </div>
      <div className="mb-8 flex flex-col gap-4">
        {formLinks?.map((link: FormLink) => <FormLink link={link} />)}
      </div>
    </div>
  );
}

function FormLinksMobile({
  formLinks,
  mutateAsync,
  isLoading,
}: FormLinksProps) {
  const initialValuesObj = formLinks?.reduce(
    (acc, link) => {
      acc[link.linkType] = link.link || "";
      return acc;
    },
    {} as Record<string, string>
  );
  console.log(initialValuesObj);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Formik
      initialValues={{ ...initialValuesObj }}
      onSubmit={(values) => {
        console.log(values);
        mutateAsync(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div className="card">
            <div className="card-body w-full">
              <h1 className="card-title text-3xl">Form Links</h1>
              <div className="card-actions flex flex-col gap-4">
                {formLinks?.map((link) => (
                  <div key={link.linkType} className="flex w-full flex-col">
                    <label htmlFor={link.linkType}>
                      {link.linkName} Form Link
                    </label>
                    <Field
                      placeholder="Enter link URL"
                      id={link.linkType}
                      name={link.linkType}
                      value={values[link.linkType]}
                      component="input"
                      className="rounded-md border-[1px] border-gray-300"
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-secondary w-full">
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FormLinksDesktop({
  formLinks,
  mutateAsync,
  isLoading,
}: FormLinksProps) {
  const initialValuesObj = formLinks?.reduce(
    (acc, link) => {
      acc[link.linkType] = link.link || "";
      return acc;
    },
    {} as Record<string, string>
  );
  console.log(initialValuesObj);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Formik
      initialValues={{ ...initialValuesObj }}
      onSubmit={(values) => {
        console.log(values);
        mutateAsync(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div className="card w-[450px]">
            <div className="card-body w-full">
              <h1 className="card-title text-3xl">Form Links</h1>
              <div className="card-actions flex flex-col gap-4">
                {formLinks?.map((link) => (
                  <div key={link.linkType} className="flex w-full flex-col">
                    <label htmlFor={link.linkType}>
                      {link.linkName} Form Link
                    </label>
                    <Field
                      placeholder="Enter link URL"
                      id={link.linkType}
                      name={link.linkType}
                      value={values[link.linkType]}
                      component="input"
                      className="rounded-md border-[1px] border-gray-300"
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-secondary w-full">
                  Save
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

function FormLink({ link }: { link: FormLink }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="card w-[450px]">
      <div className="card-body py-0">
        <Formik
          initialValues={{ link: link.link }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form>
              {isEditing ? (
                <div className="flex flex-col gap-4">
                  <div>{link.linkName} Form Link</div>
                  <div className="flex flex-row gap-2">
                    <Field
                      placeholder="Enter link URL"
                      id={link.linkType}
                      name="link"
                      value={values.link}
                      component="input"
                      className="w-full rounded-md border-[1px] border-gray-300"
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary w-20"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>{link.linkName} Form Link</div>
                  <div className="flex flex-row gap-2">
                    <a
                      className="my-auto truncate text-blue-500"
                      href={link.link}
                    >
                      {link.link}
                    </a>
                    <button
                      type="button"
                      className="btn ml-4 w-20"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
