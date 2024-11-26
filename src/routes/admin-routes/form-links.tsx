import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

type FormLinkProps = {
  formLink: FormLink;
  mutateAsync: any;
  isLoading: boolean;
};
interface FormLink {
  linkName: string;
  link: string;
  linkType: string;
  linkId: number;
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

  return (
    <div className="mx-auto">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="card-title px-8 pt-4 text-3xl">Form Links</h1>
        {formLinks?.map((link: FormLink) => (
          <div key={link.linkId}>
            <FormLink
              formLink={link}
              mutateAsync={mutateAsync}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FormLink({ formLink, mutateAsync, isLoading }: FormLinkProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (values: { link: string }) => {
    const updatedFormLink = {
      ...formLink,
      link: values.link,
    };
    await mutateAsync([updatedFormLink]);
    setIsEditing(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="card desktop:w-[450px]">
      <div className="card-body py-0">
        {isEditing ? (
          <Formik
            initialValues={{ link: formLink.link }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold">{formLink.linkName}</div>
                  <div className="flex flex-row gap-2">
                    <Field
                      placeholder="Enter link URL"
                      id={formLink.linkType}
                      name="link"
                      value={values.link}
                      component="input"
                      className="w-full rounded-md border-[1px] border-gray-300"
                    />
                    <button type="submit" className="btn btn-secondary w-20">
                      Save
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="font-semibold">{formLink.linkName}</div>
            <div className="flex flex-row gap-2">
              <a
                className="my-auto truncate text-blue-500"
                href={formLink.link}
              >
                {formLink.link}
              </a>
              <button
                type="button"
                className="btn ml-2 w-20"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
