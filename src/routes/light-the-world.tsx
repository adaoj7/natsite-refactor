import Card from "../components/Card";
import MobileBackground from "../assets/backgrounds/Background-Mobile-PSO.jpg";
import Spacer from "../components/Spacer";

export default function LightTheWorld() {
  return (
    <>
      <Spacer />
      <Card
        image={MobileBackground}
        textSide="left"
        title="This is the title"
        content="This is my text content"
      />
      <Card
        image={MobileBackground}
        textSide="right"
        title="Another Title"
        content="Some more content"
      />
    </>
  );
}
