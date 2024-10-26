import Spacer from "../components/Spacer";
import Flyer from "../assets/site-images/this-year/2024/Pictures/2024 Festival Handout 5.5 x 8.jpg";
import Img4x6PDF from "../assets/site-images/this-year/2024/PDF/2024 Festival Invitation horizontal.pdf";
import ImgHalfSheetPDF from "../assets/site-images/this-year/2024/PDF/2024 Festival Handout 5.5 x 8.pdf";
import ImgPosterPDF from "../assets/site-images/this-year/2024/PDF/2024 Festival Poster 8.5 x 11.pdf";
import SpanishPDF from "../assets/site-images/this-year/2024/PDF/2024 Festival Handout Spanish.pdf";
import Osterrieder from "../assets/site-images/this-year/2024/Pictures/Osterrieder.jpeg";
import WoodenNativity from "../assets/site-images/this-year/2024/Pictures/WoodenNativity.jpg";
import Fontanini from "../assets/site-images/this-year/2024/Pictures/Fontanini.jpg";
import Image from "../components/Image";
import { SpacerBar } from "../components/SpacerBar";

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
    <div className="w-full">
      <section className="card justify-center text-2xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">This Year</div>
          <div className="card-title justify-center font-Dancing text-6xl">
            All is Bright
          </div>
          <div className="mt-4 flex justify-center">
            <img src={Flyer} className="size-2/3" />
          </div>
        </div>
      </section>

      <section className="card my-8 rounded-none bg-secondary">
        <div className="card-body">
          <div className="card-title mb-4 justify-center">Download links:</div>
          <div className="flex w-full flex-col items-center gap-8">
            <a
              href={Img4x6PDF}
              download={"2024 Festival Invitation horizontal.pdf"}
              className="btn w-48"
            >
              Printable Invite 4x6
            </a>
            <a
              href={ImgHalfSheetPDF}
              download={"2024 Festival Handout 5.5 x 8.pdf"}
              className="btn w-48"
            >
              Printable Half Sheet
            </a>
            <a
              href={ImgPosterPDF}
              download={"2024 Festival Poster 8.5 x 11.pdf"}
              className="btn w-48"
            >
              Printable Poster
            </a>
            <a
              href={SpanishPDF}
              download={"2024 Festival Handout Spanish.pdf"}
              className="btn w-48"
            >
              Spanish Version
            </a>
          </div>
        </div>
      </section>

      <section className="card mt-4 justify-center text-xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">New In 2024</div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <div className="text-center font-semibold italic">
                This year we will be featuring the Historic Cathedral Nativity
                Scene from St. Mary's Cathedral in Peoria.
              </div>
              <div>
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
              <Image
                src={Osterrieder}
                alt={"Historic Cathedral Nativity Scene"}
                type={"vertical"}
                size={"sm"}
                direction={"center"}
              />
            </div>
          </div>
        </div>
      </section>

      <SpacerBar size="lg" />

      <section className="card my-4 justify-center text-xl">
        <div className="card-body gap-8">
          <div className="card-title justify-center text-center text-2xl">
            Additional Displays
          </div>
          <div>
            We are pleased to display the handwork of Pekin artisan, Vic
            McDonald. Well known in the Central Illinois Woodworker’s Club, Vic
            has made beautiful nativity scenes out of various kinds of wood. For
            his hand painted ceramic sets, he has created lighted stables. He is
            also pleased to display a hand-carved Olive wood nativity that he
            carried on his lap on the trip home from the Holy Land.
          </div>
          <Image
            src={WoodenNativity}
            alt={"Vic McDonald"}
            type={"vertical"}
            size={"lg"}
            direction={"center"}
          />
          <div>
            We are happy to share the international nativity collection of
            Father Ronald Margherio from St. Bede Academy in Peru, Illinois.
            Many of his precious scenes were obtained on his travels and many
            were gifts from dear friends.{" "}
          </div>
          <div>
            Diana Lage's Fontanini Collection will be back again to delight
            everyone. Her display of over 3,000 pieces will include scenes that
            focus on the women of the gospels in addition to the nativity and
            life of Jesus Christ.
          </div>
          <Image
            src={Fontanini}
            alt={"Fontanini Collection"}
            type={"vertical"}
            size={"md"}
            direction={"center"}
          />
        </div>
      </section>
    </div>
  );
}

function ThisYearDesktop() {
  return (
    <div className="w-full">
      <section className="card mx-12 justify-center text-xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">This Year</div>
          <div className="card-title justify-center font-Dancing text-6xl">
            All is Bright
          </div>
          <div className="mt-4 flex justify-center">
            <Image
              src={Flyer}
              alt={"2024 Festival Handout 5.5 x 8"}
              type={"vertical"}
              size={"md"}
              direction={"center"}
            />
          </div>
        </div>
      </section>

      <section className="card my-8 rounded-none bg-secondary">
        <div className="card-body">
          <div className="card-title mb-4 justify-center">Download links:</div>
          <div className="flex w-full justify-center gap-12">
            <a
              href={Img4x6PDF}
              download={"2024 Festival Invitation horizontal.pdf"}
              className="btn w-48"
            >
              Printable Invite 4x6
            </a>
            <a
              href={ImgHalfSheetPDF}
              download={"2024 Festival Handout 5.5 x 8.pdf"}
              className="btn w-48"
            >
              Printable Half Sheet
            </a>
            <a
              href={ImgPosterPDF}
              download={"2024 Festival Poster 8.5 x 11.pdf"}
              className="btn w-48"
            >
              Printable Poster
            </a>
            <a
              href={SpanishPDF}
              download={"2024 Festival Handout Spanish.pdf"}
              className="btn w-48"
            >
              Spanish Version
            </a>
          </div>
        </div>
      </section>

      <section className="card mx-12 mt-4 justify-center text-xl">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">New In 2024</div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 text-center">
              <div className="font-semibold italic">
                This year we will be featuring the Historic Cathedral Nativity
                Scene from St. Mary's Cathedral in Peoria.
              </div>
              <div className="px-20">
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
              <Image
                src={Osterrieder}
                alt={"Historic Cathedral Nativity Scene"}
                type={"vertical"}
                size={"sm"}
                direction={"center"}
              />
            </div>
          </div>
        </div>
      </section>

      <SpacerBar size="lg" />

      <section className="card mx-12 my-4 justify-center text-xl">
        <div className="card-body gap-8 px-20">
          <div className="card-title justify-center text-2xl">
            Additional Displays
          </div>
          <div className="text-center">
            We are pleased to display the handwork of Pekin artisan, Vic
            McDonald. Well known in the Central Illinois Woodworker’s Club, Vic
            has made beautiful nativity scenes out of various kinds of wood. For
            his hand painted ceramic sets, he has created lighted stables. He is
            also pleased to display a hand-carved Olive wood nativity that he
            carried on his lap on the trip home from the Holy Land.
          </div>
          <Image
            src={WoodenNativity}
            alt={"Vic McDonald"}
            type={"vertical"}
            size={"lg"}
            direction={"center"}
          />
          <div className="text-center">
            We are happy to share the international nativity collection of
            Father Ronald Margherio from St. Bede Academy in Peru, Illinois.
            Many of his precious scenes were obtained on his travels and many
            were gifts from dear friends.{" "}
          </div>
          <div className="text-center">
            Diana Lage's Fontanini Collection will be back again to delight
            everyone. Her display of over 3,000 pieces will include scenes that
            focus on the women of the gospels in addition to the nativity and
            life of Jesus Christ.
          </div>
          <Image
            src={Fontanini}
            alt={"Fontanini Collection"}
            type={"vertical"}
            size={"xl"}
            direction={"center"}
          />
        </div>
      </section>
    </div>
  );
}
