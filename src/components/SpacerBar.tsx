import clsx from "clsx";

interface SpacerBarProps {
  size?: "sm" | "md" | "lg";
}

export function SpacerBar({ size = "md" }: SpacerBarProps) {
  const sizeMap = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  return (
    <>
      <div className={clsx("my-8 w-full bg-primary", sizeMap[size])}></div>
    </>
  );
}
