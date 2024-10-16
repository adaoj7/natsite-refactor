import React from "react";

interface NativitiesProps {}

export default function Nativities() {
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
    <>
      <div>Hello There</div>
    </>
  );
}
