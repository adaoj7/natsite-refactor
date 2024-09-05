import HeroImage from "../components/Hero";
import DesktopBackground from "../assets/backgrounds/Background-Desktop-Edited.jpg";
import Logo from "../assets/logos/CFN White-01.png";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Home() {
  const { isAuthenticated, user } = useAuth0();
  async function handleLogin() {
    try {
      await axios.post("/api/login", user);
    } catch (error) {
      console.error(error);
    }
  }
  if (isAuthenticated) {
    handleLogin();
  }

  return (
    <>
      <HeroImage />
      <div>Content</div>
    </>
  );
}
