import clsx from "clsx";
interface SpacerProps {
  size?: "xs" | "sm" | "md";
}

export default function Spacer({ size = "sm" }: SpacerProps) {
  const sizeMap = {
    xs: "h-12",
    sm: "h-24",
    md: "h-36",
  };
  return <div className={clsx(sizeMap[size])}></div>;
}
