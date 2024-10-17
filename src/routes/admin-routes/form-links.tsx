import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";

type FormLinksProps = {
  formLinks: FormLinks[];
  mutateAsync: any;
  isLoading: boolean;
};
interface FormLinks {
  linkName: string;
  link: string;
  linkType: string;
}

const FormLinks: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: formLinks, isLoading } = useQuery({
    queryKey: ["formLinks"],
    queryFn: async () => {
      const response = await axios.get("/api/links");
      return response.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (updatedFormLinks: FormLinks[]) => {
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
    </div>
  );
};

const FormLinksMobile: React.FC<FormLinksProps> = ({
  formLinks,
  mutateAsync,
  isLoading,
}) => {
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
                  <div key={link.linkType}>
                    <label htmlFor={link.linkType}>
                      {link.linkName} Form Link
                    </label>
                    <Field
                      placeholder="Enter link URL"
                      id={link.linkType}
                      name={link.linkType}
                      value={values[link.linkType]}
                      component="input"
                      className="w-full rounded-md border-[1px] border-gray-300"
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
};

const FormLinksDesktop: React.FC<FormLinksProps> = ({
  formLinks,
  mutateAsync,
  isLoading,
}) => {
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
                  <div key={link.linkType}>
                    <label htmlFor={link.linkType}>
                      {link.linkName} Form Link
                    </label>
                    <Field
                      placeholder="Enter link URL"
                      id={link.linkType}
                      name={link.linkType}
                      value={values[link.linkType]}
                      component="input"
                      className="w-full rounded-md border-[1px] border-gray-300"
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
};

export default FormLinks;
