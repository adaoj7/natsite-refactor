﻿import Card from "../components/Card";
import img2023 from "../assets/site-images/light-the-world/IMG_7720.jpg";
import img2022 from "../assets/site-images/light-the-world/DualAward-PSO.jpg";
import img2021 from "../assets/site-images/light-the-world/2022-Drs-Ruskusky-PSO.jpg";
import Spacer from "../components/Spacer";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type LTWProps = {
  link: SiteLink;
  isLoading: boolean;
};

interface SiteLink {
  linkType: string;
  linkName: string;
  link: string;
}

export default function LightTheWorld() {
  const { data: siteLink, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await axios.get("/api/links", {
        params: { linkType: "lightTheWorld" },
      });
      return response.data;
    },
  });

  const location = useLocation();

  console.log("siteLink", siteLink);

  return (
    <>
      {location.pathname === "/lightTheWorld" ? (
        <>
          <Spacer />
          <div className="flex-col phone:flex desktop:hidden">
            <LTWMobile link={siteLink} isLoading={isLoading} />
          </div>
          {/* Maybe change the breakpoint */}
          <div className="hidden flex-col desktop:flex">
            <LTWDesktop link={siteLink} isLoading={isLoading} />
          </div>
        </>
      ) : null}
      <Spacer />
      <Outlet />
    </>
  );
}

function LTWMobile({ link, isLoading }: LTWProps) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title justify-center text-xl">
            Light the World Award
          </h1>
          <div className="p-4">
            <p className="mb-6 flex text-xl">
              The “Light the World” award is given to a group or individuals to
              recognize their exemplary Christ-like service, sacrifice, and
              ministry in order to alleviate real struggles by reaching out to
              individuals one-by-one, lifting spirits, and providing hope to the
              lost and broken. The award is given to those who light the
              community of Central Illinois by making a meaningful and lasting
              contribution through selfless acts of service that changes lives.
            </p>
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                To nominate an individual or organization please click here
              </p>
              {isLoading || !link ? (
                <div className="btn btn-disabled">Nominate</div>
              ) : (
                <NavLink to={link.link} className="btn">
                  Nominate
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <Card
        // image={img2023}
        textSide="right"
        title="2023"
        content="This is my text content"
      >
        <div className="[&>*]:my-4">
          <h2 className="card-title justify-center">
            Loaves and Fish -- First United Methodist Church
          </h2>
          <h2 className="card-title justify-center">
            Porch Pantry -- Kelli Martin
          </h2>
        </div>
      </Card>
    </>
  );
}

function LTWDesktop({ link, isLoading }: LTWProps) {
  return (
    <>
      <div className="card flex-col justify-center">
        <div className="card-body">
          <h1 className="card-title my-4 justify-center text-2xl">
            Light the World Award
          </h1>
          <div className="flex flex-col px-40">
            <p className="mb-6 flex justify-center text-center text-xl">
              The “Light the World” award is given to a group or individuals to
              recognize their exemplary Christ-like service, sacrifice, and
              ministry in order to alleviate real struggles by reaching out to
              individuals one-by-one, lifting spirits, and providing hope to the
              lost and broken. The award is given to those who light the
              community of Central Illinois by making a meaningful and lasting
              contribution through selfless acts of service that changes lives.
            </p>
            <div className="flex flex-row items-center justify-center">
              <div className="mx-8">
                To nominate an individual or organization please click here
              </div>
              {isLoading || !link ? (
                <div className="btn btn-disabled">Nominate</div>
              ) : (
                <Link to={link.link} className="btn">
                  Nominate
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <Card
        image={img2023}
        textSide="right"
        title="2023"
        content="This is my text content"
      >
        <div className="[&>*]:my-4">
          <h2 className="card-title justify-center">
            Loaves and Fish -- First United Methodist Church
          </h2>
          <h2 className="card-title justify-center">
            Porch Pantry -- Kelli Martin
          </h2>
          <Link to={"/lightTheWorld/2023"}>View More</Link>
        </div>
      </Card>
      <Card
        image={img2022}
        textSide="left"
        title="2022"
        content="This is my text content"
      >
        <div className="[&>*]:my-4">
          <h2 className="card-title flex justify-center">
            Jobs Partnership--Offering A Helping Hand
          </h2>
          <p className="">
            The Jobs Partnership is a faith-based program that brings together
            local churches and area businesses to train, equip, and employ
            citizens in the Peoria and surrounding counties. The primary goal is
            to bring program participants from dependency to self-sufficiency,
            to help them get and keep a job. Participants are required to
            complete a free 8-12 week classroom course designed to promote
            personal growth and professional success, including Biblical
            perspectives on practical work principles and habits. Volunteers
            focus on making participants productive, tax-paying citizens and
            supporting families who contribute to the wellness of the local
            community. It was founded on the idea that relationships are key to
            changing and improving lives. It was brought to Peoria in 2000
            through the efforts of Heaven's View Christian Fellowship, and has
            expanded to Bloomington-Normal, a few county jails, several state
            prisons, the Federal Prison system and to international communities.
            Locally, some classes are held at the Federal prison, county jails,
            and at Heaven's View Christian Fellowship Church.
          </p>
          <h2 className="card-title flex justify-center">
            Neal Glassett--Lifeline Pilots
          </h2>
          <p className=" ">
            Neal Glassett has logged 86 in-flight hours and 11,000 miles
            transporting medical patients around the country in his first year
            with LifeLine Pilots. Founded in 1981, by Wanda Whitsitt of
            Champaign, IL, LifeLine Pilots' mission is to coordinate free air
            transportation, through volunteer pilots, for passengers with
            medical and humanitarian needs far from home. These private flights
            provide medical patients with a safe travel environment reducing
            risk of exposure in their vulnerable conditions. They also get
            patients to their destinations more quickly than commercial flights
            can. LifeLine Pilots began as a small group of pilots in Illinois
            who envisioned using their special skill of flying to help people
            with emergencies to reach medical centers. Neal learned about this
            program while he was receiving his pilot licensure training in 2016.
            He knew he wanted to use his talents and love for flying to serve
            others. One of the requirements for LifeLine Pilots is a minimum of
            250 hours of flying time. Most Saturdays with fair weather found
            Neal flying rescue dogs to new owners for Pilots and Paws to acquire
            the needed hours. In addition to his time, Neal donates 100% of the
            cost of transporting people and pets in his Piper airplane.
          </p>
        </div>
      </Card>
      <Card
        image={img2021}
        textSide="right"
        title="2021"
        content="Some more content"
        placement="object-top"
      >
        <div>
          <h2 className="card-title flex justify-center">
            Dr. Jeff and Dr. Suzanne White Ruskusky - Almost Home Kids
          </h2>
          <div className="[&>*]:my-4">
            <p className="">
              Drs. Jeff and Suzanne are local podiatrists who were very
              instrumental in establishing Almost Home Kids in Peoria which is
              located at 5200 N. Hamilton Rd. Peoria, IL 61614. Jeff and Suzanne
              were the driving force behind this home being built through their
              dedication, their fund raising, and their loving care for children
              with special needs. While raising two sons (Garrett and Gabriel)
              with special needs they saw the need for this home to be here in
              Peoria not only for their sons but for other special needs
              children in our area.
            </p>
            <p className="">
              Almost Home Kids provides a bridge from hospital to home through
              an innovative community-based care system for children with
              medical complexities. Almost Home Kids responds to the needs of
              families, train caregivers, offer respite care, advocate for
              accessibility and inclusion and educate healthcare professionals.
            </p>
            <p className="">
              The Peoria Home is one of only three in the nation and is
              affiliated with OSF Healthcare Children's Hospital of Illinois.
              For more information please go to their website:{" "}
              <Link
                target={"_blank"}
                to={"https://www.almosthomekids.org/"}
                className="underline"
              >
                Almost Home Kids
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
