// import React from "react";

// interface MusicProps {}

export default function Music() {
  return (
    <>
      <div className="flex desktop:hidden">
        <MusicMobile />
      </div>
      <div className="mobile:hidden desktop:flex">
        <MusicDesktop />
      </div>
    </>
  );
}

export function MusicMobile() {
  return (
    <>
      <div>Hello There</div>
    </>
  );
}

export function MusicDesktop() {
  return (
    <>
      <div>Hello There</div>
    </>
  );
}
