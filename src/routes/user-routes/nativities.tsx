import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface NativitiesProps {}

export default function Nativities() {
  const { data: siteLink, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get("/api/links", {
        params: { linkType: "poinsettias" },
      });
      return response.data;
    },
  });

  console.log("siteLink", siteLink, isLoading);

  return (
    <>
      <div className="flex desktop:hidden">
        <NativitiesMobile />
      </div>
      <div className="mobile:hidden desktop:flex">
        <NativitiesDesktop />
      </div>
    </>
  );
}

export function NativitiesMobile() {
  return (
    <>
      <div>Hello There</div>
    </>
  );
}

export function NativitiesDesktop() {
  return (
    <div>
      Fill out this form to have your nativity included in the display for the
      2024 event. Please register your nativities prior to bringing them to the
      Festival to expedite the check-in process. If you have previously
      registered a nativity and would like to lend your nativity again, you
      should receive an email. If you do not, please contact us at:
      sharepeorianativities@gmail.com If you have numerous nativities to lend
      for the event, please contact us at: sharepeorianativities@gmail.com
      Nativity pickup is Monday December 9th
    </div>
  );
}
