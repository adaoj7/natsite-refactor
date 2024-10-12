import Spacer from "../components/Spacer";
import Flyer from "../assets/site-images/this-year/2024 Festival Handout 5.5 x 8.jpg";
import img4x6 from "../assets/site-images/this-year/2024 Festival Invitation horizontal.jpg";
import imgHalfSheet from "../assets/site-images/this-year/2024 Festival Handout 5.5 x 8.jpg";
import imgPoster from "../assets/site-images/this-year/2024 Festival Poster 8.5 x 11.jpg";

export default function ThisYear() {
  return (
    <>
      <Spacer />
      <div className="phone:flex desktop:hidden">
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
        <div className="card justify-center text-2xl">
          <div className="card-body">
            <div className="card-title justify-center text-2xl">This Year</div>
            <div className="card-title justify-center font-Dancing text-6xl">
              All is Bright
            </div>
            <div className="mt-4 flex justify-center">
              <img src={Flyer} className="size-2/3" />
            </div>
          </div>
        </div>
        <div className="card my-8 rounded-none bg-secondary">
          <div className="card-body">
            <div className="card-title mb-4 justify-center">
              Download links:
            </div>
            <div className="flex w-full flex-col items-center gap-8">
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
      <div className="card mx-12 my-4 justify-center text-xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">This Year</div>
          <div className="card-title justify-center font-Dancing text-6xl">
            All is Bright
          </div>
          <div className="mt-4 flex justify-center">
            <img src={Flyer} className="size-1/3" />
          </div>
        </div>
      </div>
      <div className="card my-8 rounded-none bg-secondary">
        <div className="card-body">
          <div className="card-title mb-4 justify-center">Download links:</div>
          <div className="flex w-full justify-center gap-12">
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
