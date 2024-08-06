import clsx from "clsx";

type ButtonProps = {
  name: string;
  size?: "small" | "medium" | "large";
  color:  "neutral";
};

const Button = ({ name, size = "medium", color }: ButtonProps) => {
  const buttonSizes = {
    small: "w-24 h-10",
    medium: "w-32 h-14",
    large: "w-40 h-16",
  };

  const buttonColors = {
    neutral: "bg-gray-500 hover:bg-gray-700 active:bg-gray-800",
  };

  return (
    <button
      className={clsx(
        buttonSizes[size],
        buttonColors[color],
        "btn h-10 w-16 text-white"
      )}
    >
      <div>{name}</div>
    </button>
  );
};

export default Button;
