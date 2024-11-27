import clsx from "clsx";
import MobileBackground from "../assets/backgrounds/Background-Mobile-PSO.jpg";
import DesktopOptimized from "../assets/backgrounds/Background-Optimized.jpg";
import Logo from "../assets/logos/CFN White-01-Optimized.png";

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

function PhoneHero() {
  return (
    <>
      <img src={MobileBackground} className="" />
    </>
  );
}

function DesktopHero() {
  return (
    <>
      <img src={DesktopOptimized} className="min-h-screen" />
      <img src={Logo} className="min-h-1/4 absolute right-44 top-1/2 w-1/3" />
    </>
  );
}
