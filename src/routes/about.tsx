import Spacer from "../components/Spacer";
import AboutImage from "../assets/site-images/MTCNav-PSO.jpg";

export default function About() {
  return (
    <>
      <Spacer />
      <div className="phone:flex desktop:hidden">
        <AboutMobile />
      </div>
      <div className="hidden desktop:flex">
        <AboutDesktop />
      </div>
    </>
  );
}

function AboutMobile() {
  return (
    <div className="card my-4 flex flex-col items-center justify-center text-xl">
      <div className="card-body">
        <h1 className="card-title flex justify-center text-2xl">
          About Us and Our Mission
        </h1>
        <div className="mt-4">
          <p className="">
            The Peoria Area Community Festival of Nativities began in 2016 as an
            attempt to gather those with a love of Christ across denominations
            during the Christmas holiday. Originally spearheaded by the Church
            of Jesus Christ of Latter-day Saints, the Sisters of St. Francis of
            the Immaculate Conception, friends from St. Vincent de Paul Catholic
            Church, and All Saints Greek Orthodox Church the festival has
            expanded to include a multitude of congregations, showcasing over
            1000 nativities and engaging hundreds of volunteers.
          </p>
          <p className="py-4">
            Free to the public, we invite everyone to join us in celebrating the
            birth of Jesus Christ by viewing nativity displays from around the
            world and enjoying musical performances from local talent. Members
            from different churches in the Central Illinois Area and beyond have
            come together to create this unique and complimentary interfaith
            ecumenical nativity exhibit with one simple hope in mind: to provide
            a peaceful place for individuals and families to reflect upon
            Christ's sacred birth as they usher in the Christmas season.
          </p>
          <p className="">
            The nativity scene has been around since 1223, when St. Francis of
            Assisi was inspired by a trip to the Holy Land and used living
            people and animals to stage Jesus Christ's humble beginnings. The
            living scene was soon recreated in other Catholic countries in the
            form of three dimensional figurines, also known as a crèche, with
            Mary and the Christ child at the center, often surrounded by Joseph,
            shepherds
          </p>
          <div className="mt-8 flex align-middle">
            <img src={AboutImage} className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutDesktop() {
  return (
    <>
      <div className="card mx-12 my-4 flex flex-col items-center justify-center text-xl">
        <div className="card-body">
          <h1 className="card-title flex justify-center text-2xl">
            About Us and Our Mission
          </h1>
          <div className="mt-8">
            <p className="py-2">
              The Peoria Area Community Festival of Nativities began in 2016 as
              an attempt to gather those with a love of Christ across
              denominations during the Christmas holiday. Originally spearheaded
              by the Church of Jesus Christ of Latter-day Saints, the Sisters of
              St. Francis of the Immaculate Conception, friends from St. Vincent
              de Paul Catholic Church, and All Saints Greek Orthodox Church the
              festival has expanded to include a multitude of congregations,
              showcasing over 1000 nativities and engaging hundreds of
              volunteers.
            </p>
            <p className="py-2">
              Free to the public, we invite everyone to join us in celebrating
              the birth of Jesus Christ by viewing nativity displays from around
              the world and enjoying musical performances from local talent.
              Members from different churches in the Central Illinois Area and
              beyond have come together to create this unique and complimentary
              interfaith ecumenical nativity exhibit with one simple hope in
              mind: to provide a peaceful place for individuals and families to
              reflect upon Christ's sacred birth as they usher in the Christmas
              season.
            </p>
            <p className="py-2">
              The nativity scene has been around since 1223, when St. Francis of
              Assisi was inspired by a trip to the Holy Land and used living
              people and animals to stage Jesus Christ's humble beginnings. The
              living scene was soon recreated in other Catholic countries in the
              form of three dimensional figurines, also known as a crèche, with
              Mary and the Christ child at the center, often surrounded by
              Joseph, shepherds, wise men, angels, and animals. The crèche
              gained popularity and has spread across cultural and political
              boundaries to become a traditional Christian symbol of Christ's
              birth.
            </p>
            <div className="mt-8 flex align-middle">
              <img src={AboutImage} className="m-10 h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
