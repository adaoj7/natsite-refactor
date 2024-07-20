import clsx from "clsx";

type HeroProps = {
  size: "small" | "medium" | "large";
  phone: "phone" | "desktop";
  image: string;
  logo?: string;
  className?: string;
};

export default function HeroImage({
  size,
  phone,
  image,
  logo,
  className,
}: HeroProps) {
  const imageSize = {
    small: "w-24 h-10",
    medium: "w-32 h-14",
    large: "w-40 h-16",
  };

  // I am not sure this is the right solution because I still need the image to be hidden depending on the screen size

  return (
    <div>
      <div className={clsx(imageSize[size], "top-0 flex relative", className)}>
        {phone === "phone" ? (
          <img src={image} alt="phoneHero" className="h-full" />
        ) : (
          <>
            <img src={image} alt="desktopHero" className="min-h-screen" />
            <img
              src={logo}
              alt="heroLogo"
              className="absolute w-1/3 top-1/2 right-44 min-h-1/4"
            />
          </>
        )}
      </div>
    </div>
  );
}
