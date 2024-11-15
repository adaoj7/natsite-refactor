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
            them to the drop-off to expedite the check-in process.
          </div>
          <div>
            This form includes a quick way to re-register past nativities as
            well as an option to register nativities that will be new to the
            festival this year.
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
            This form includes a quick way to re-register past nativities as
            well as an option to register nativities that will be new to the
            festival this year.
          </div>
          <div>
            If you have any questions, please email us at
            sharepeorianativities@gmail.com
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
        <div className="text-center">
          <h3 className="text-2xl font-semibold">
            Drop-off and Pickup Information
          </h3>
          <div className="flex flex-col gap-2">
            <div>Drop-off</div>
            <div>Monday, December 2---8am-8pm</div>
            <div>Tuesday, December 3---8am-noon</div>
          </div>
          <div>
            <div>Pickup</div>
            <div>Monday, December 9---8am-7pm</div>
          </div>
          <div>Location: 3700 W Reservoir Blvd, Peoria</div>
        </div>
      </div>
    </div>
  );
}
