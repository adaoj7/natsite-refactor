import clsx from "clsx";

interface ImageProps {
  src: string;
  alt: string;
  type?: "horizontal" | "vertical" | "none";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  direction?: "top" | "center" | "bottom";
}

export default function Image({
  src,
  alt,
  size = "md",
  direction = "center",
  type = "horizontal",
}: ImageProps) {
  const imgSize = {
    xs: "h-[100px] w-[150px]",
    sm: "h-[200px] w-[300px]",
    md: "h-[250px] w-[375px]",
    lg: "h-[300px] w-[450px]",
    xl: "h-[400px] w-[600px]",
  };
  const imgDirection = {
    top: "object-top",
    center: "object-center",
    bottom: "object-bottom",
  };
  const imgType = {
    horizontal: "w-full",
    vertical: "h-full",
    none: "",
  };

  return (
    <div className="flex justify-center">
      <img
        src={src}
        alt={alt}
        className={clsx(
          "flex select-none justify-center object-cover",
          imgSize[size],
          imgDirection[direction],
          imgType[type]
        )}
      />
    </div>
  );
}
