// import React from "react";
import Spacer from "../components/Spacer";
import Flyer from "../assets/site-images/this-year/2024 Festival Handout 5.5 x 8.jpg";
import img4x6 from "../assets/site-images/this-year/2024 Festival Invitation horizontal.jpg";
import imgHalfSheet from "../assets/site-images/this-year/2024 Festival Handout 5.5 x 8.jpg";
import imgPoster from "../assets/site-images/this-year/2024 Festival Poster 8.5 x 11.jpg";

export default function ThisYear() {
  return (
    <>
      <Spacer />
      <div className="desktop:hidden phone:flex">
        <ThisYearMobile />
      </div>
      {/* Maybe change the breakpoint */}
      <div className="hidden desktop:flex">
        <ThisYearDesktop />
      </div>
    </>
  );
}

function ThisYearMobile() {
  return (
    <>
      <div className="w-full">
        <div className="card justify-center">
          <div className="card-body">
            <div className="card-title justify-center text-2xl">This Year</div>
            <div className="card-title justify-center text-6xl font-Dancing">
              All is Bright
            </div>
            <div className="flex justify-center mt-4">
              <img src={Flyer} className="size-2/3" />
            </div>
          </div>
        </div>
        <div className="card bg-secondary rounded-none  my-8">
          <div className="card-body">
            <div className="card-title justify-center mb-4">
              Download links:
            </div>
            <div className="flex flex-col items-center w-full gap-8">
              <a
                href={img4x6}
                download={"2024 Festival Invitation horizontal.jpg"}
                className="btn w-48"
              >
                Printable Invite 4x6
              </a>
              <a
                href={imgHalfSheet}
                download={"2024 Festival Handout 5.5 x 8.jpg"}
                className="btn w-48"
              >
                Printable Half Sheet
              </a>
              <a
                href={imgPoster}
                download={"2024 Festival Poster 8.5 x 11.jpg"}
                className="btn w-48"
              >
                Printable Poster
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ThisYearDesktop() {
  return (
    <div className="w-full">
      <div className="card justify-center">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">This Year</div>
          <div className="card-title justify-center text-6xl font-Dancing">
            All is Bright
          </div>
          <div className="flex justify-center mt-4">
            <img src={Flyer} className="size-1/3" />
          </div>
        </div>
      </div>
      <div className="card bg-secondary rounded-none  my-8">
        <div className="card-body">
          <div className="card-title justify-center mb-4">Download links:</div>
          <div className="flex justify-center w-full gap-12">
            <a
              href={img4x6}
              download={"2024 Festival Invitation horizontal.jpg"}
              className="btn w-48"
            >
              Printable Invite 4x6
            </a>
            <a
              href={imgHalfSheet}
              download={"2024 Festival Handout 5.5 x 8.jpg"}
              className="btn w-48"
            >
              Printable Half Sheet
            </a>
            <a
              href={imgPoster}
              download={"2024 Festival Poster 8.5 x 11.jpg"}
              className="btn w-48"
            >
              Printable Poster
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
