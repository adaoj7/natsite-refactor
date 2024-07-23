import Button from "../components/Button";
import HeroImage from "../components/Hero";
import DesktopBackground from "../assets/Background-Desktop-PSO.jpg";

export default function home() {
  return (
    <>
      <HeroImage image={DesktopBackground} />
      <Button name="Missy" color="neutral" />
      <Button name="Button" size="small" color="green" />
      <Button name="Caleb" size="medium" color="blue" />
      <Button name="liam" size="large" color="red" />
    </>
  );
}
