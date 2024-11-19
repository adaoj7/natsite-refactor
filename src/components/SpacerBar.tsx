import clsx from "clsx";

interface SpacerBarProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export function SpacerBar({ size = "md", className }: SpacerBarProps) {
  const sizeMap = {
    xs: "h-0.5",
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  return (
    <>
      <div
        className={clsx("my-8 w-full bg-primary", sizeMap[size], className)}
      ></div>
    </>
  );
}
