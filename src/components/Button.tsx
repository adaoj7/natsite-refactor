import clsx from "clsx";

type ButtonProps = {
  name: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  type: "submit" | "button";
  className?: string;
};

const Button = ({
  name,
  size = "medium",
  color = "primary",
  className,
  type = "submit",
}: ButtonProps) => {
  const buttonSizes = {
    small: "w-24 h-10",
    medium: "w-32 h-14",
    large: "w-40 h-16",
  };

  const buttonColors = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  return (
    <button
      className={clsx(
        buttonSizes[size],
        buttonColors[color],
        "btn h-10 w-16 text-white",
        className
      )}
      type={type}
    >
      <div>{name}</div>
    </button>
  );
};

export default Button;
