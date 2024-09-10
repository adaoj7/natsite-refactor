import clsx from "clsx";
import MobileBackground from "../assets/backgrounds/Background-Mobile-PSO.jpg";
import DesktopBackground from "../assets/backgrounds/Background-Desktop-Edited.jpg";
import Logo from "../assets/logos/CFN White-01.png";

type HeroProps = {
  className?: string;
};

export default function HeroImage({ className }: HeroProps) {
  //   const imageSize = {
  //     small: "w-24 h-10",
  //     medium: "w-32 h-14",
  //     large: "w-40 h-16",
  //   };

  // I am not sure this is the right solution because I still need the image to be hidden depending on the screen size

  return (
    <div>
      <div className={clsx("top-0 flex relative", className)}>
        <div className="desktop:hidden phone:flex">
          <PhoneHero />
        </div>
        {/* Maybe change the breakpoint */}
        <div className="hidden desktop:flex">
          <DesktopHero />
        </div>
      </div>
    </div>
  );
}

const PhoneHero: React.FC = () => {
  return (
    <>
      <img src={MobileBackground} className="" />
    </>
  );
};

const DesktopHero: React.FC = () => {
  return (
    <>
      <img src={DesktopBackground} className="min-h-screen" />
      <img src={Logo} className="absolute w-1/3 top-1/2 right-44 min-h-1/4" />
    </>
  );
};
