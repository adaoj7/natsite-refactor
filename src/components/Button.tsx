import clsx from "clsx";

type ButtonProps = {
  name: string;
  size?: "small" | "medium" | "large";
  color?: "neutral";
  type: "submit" | "button";
  className?: string;
};

const Button = ({ name, size = "medium", className }: ButtonProps) => {
  const buttonSizes = {
    small: "w-24 h-10",
    medium: "w-32 h-14",
    large: "w-40 h-16",
  };

  return (
    <button
      className={clsx(buttonSizes[size], "btn h-10 w-16 text-white", className)}
    >
      <div>{name}</div>
    </button>
  );
};

export default Button;
