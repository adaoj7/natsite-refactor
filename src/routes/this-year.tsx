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
      <section className="card mx-12 my-4 justify-center text-xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">This Year</div>
          <div className="card-title justify-center font-Dancing text-6xl">
            All is Bright
          </div>
          <div className="mt-4 flex justify-center">
            <img src={Flyer} className="size-1/3" />
          </div>
        </div>
      </section>

      <section className="card my-8 rounded-none bg-secondary">
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
      </section>

      <section className="card mx-12 my-4 justify-center text-xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">New In 2024</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-center">
              <div className="font-semibold italic">
                This year we will be featuring the Historic Cathedral Nativity
                Scene from St. Mary's Cathedral in Peoria.
              </div>
              <div className="px-12">
                We are very grateful to Most Reverend Bishop Louis Tylka for
                loaning this magnificent nativity scene to be displayed at the
                Community Festival of Nativities for the second year. Created by
                Sebastian Osterrieder in 1930, this 50-piece nativity was
                obtained by Bishop Joseph Schlarman of the Catholic Diocese of
                Peoria when he traveled to Munich in 1931. This nativity scene
                has been displayed at St. Mary’s Cathedral every year since
                then. We are thrilled to have this very beautiful creation on
                display at the festival this year.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
