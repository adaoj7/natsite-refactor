import HeroImage from "../components/Hero";
import DesktopBackground from "../assets/backgrounds/Background-Desktop-Edited.jpg";
import Logo from "../assets/logos/CFN White-01.png";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  return (
    <>
      <HeroImage image={DesktopBackground} logo={Logo} />
      <div>Content</div>
    </>
  );
}
