import clsx from "clsx";
import MobileBackground from "../assets/backgrounds/Background-Mobile-PSO.jpg";
import DesktopBackground from "../assets/backgrounds/Background-Desktop-Edited.jpg";
import Logo from "../assets/logos/CFN White-01.png";

type HeroProps = {
  className?: string;
};

export default function HeroImage({ className }: HeroProps) {
  return (
    <div>
      <div className={clsx("relative top-0 flex", className)}>
        <div className="phone:flex desktop:hidden">
          <PhoneHero />
        </div>
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
      <img src={Logo} className="min-h-1/4 absolute right-44 top-1/2 w-1/3" />
    </>
  );
};
