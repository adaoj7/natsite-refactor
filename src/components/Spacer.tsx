import clsx from "clsx";
interface SpacerProps {
  size?: "sm" | "md";
}

export default function Spacer({ size = "sm" }: SpacerProps) {
  const sizeMap = {
    sm: "h-24",
    md: "h-36",
  };
  return <div className={clsx(sizeMap[size])}></div>;
}
