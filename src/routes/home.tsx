import HeroImage from "../components/Hero";
import DesktopBackground from "../assets/backgrounds/Background-Desktop-Edited.jpg";
import Logo from "../assets/logos/CFN White-01.png";

export default function home() {
  return (
    <>
      <HeroImage image={DesktopBackground} logo={Logo} />
      <div>Content</div>
    </>
  );
}
