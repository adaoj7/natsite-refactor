import clsx from "clsx";
type FlexProps = {
  direction?: "row" | "rowReverse" | "col" | "colReverse";
  className?: string;
  children: React.ReactNode;
};

export default function Flex({
  direction = "row",
  className,
  children,
}: FlexProps) {
  const flexDirections = {
    row: "flex-row",
    rowReverse: "flex-row-reverse",
    col: "flex-col",
    colReverse: "flex-col-reverse",
  };

  return (
    <div className={clsx("flex", flexDirections[direction], className)}>
      {children}
    </div>
  );
}
