import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
// import React from "react";

type NativitiesProps = {
  link: SiteLink;
  isLoading: boolean;
};

interface SiteLink {
  linkType: string;
  linkName: string;
  link: string;
}

export default function Nativities() {
  const { data: siteLink, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get("/api/links", {
        params: { linkType: "nativities" },
      });
      return response.data;
    },
  });

  console.log("siteLink", siteLink, isLoading);

  return (
    <>
      <div className="flex desktop:hidden">
        <NativitiesMobile link={siteLink} isLoading={isLoading} />
      </div>
      <div className="mx-auto phone:hidden desktop:flex">
        <NativitiesDesktop link={siteLink} isLoading={isLoading} />
      </div>
    </>
  );
}

export function NativitiesMobile({ link, isLoading }: NativitiesProps) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title justify-center text-2xl">Nativities</div>
        <div className="flex flex-col gap-4">
          <div>
            Fill out this form to have your nativity included in the display for
            the 2024 event. Please register your nativities prior to bringing
            them to the Festival to expedite the check-in process.
          </div>
          <div>
            If you have previously registered a nativity and would like to lend
            your nativity again, you should receive an email. If you do not,
            please contact us at: sharepeorianativities@gmail.com If you have
            numerous nativities to lend for the event, please contact us at:
            sharepeorianativities@gmail.com Nativity pickup is Monday December
            9th
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          {isLoading || !link ? (
            <div className="btn btn-disabled">Register Nativity</div>
          ) : (
            <Link to={link.link} className="btn">
              Register Nativity
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function NativitiesDesktop({ link, isLoading }: NativitiesProps) {
  return (
    <div className="card max-w-3xl">
      <div className="card-body gap-8 text-xl">
        <div className="card-title justify-center text-2xl">Nativities</div>
        <div className="flex flex-col gap-4">
          <div>
            Fill out this form to have your nativity included in the display for
            the 2024 event. Please register your nativities prior to bringing
            them to the Festival to expedite the check-in process.
          </div>
          <div>
            If you have previously registered a nativity and would like to lend
            your nativity again, you should receive an email. If you do not,
            please contact us at: sharepeorianativities@gmail.com If you have
            numerous nativities to lend for the event, please contact us at:
            sharepeorianativities@gmail.com Nativity pickup is Monday December
            9th
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          {isLoading || !link ? (
            <div className="btn btn-disabled">Register Nativity</div>
          ) : (
            <Link to={link.link} className="btn">
              Register Nativity
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
