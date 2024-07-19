import clsx from "clsx";

type ButtonProps = {
  name: string;
  size?: "small" | "medium" | "large";
  color: "blue" | "green" | "red";
  state: any;
  setState: any;
};

const Button = ({
  name,
  size = "medium",
  color,
  state,
  setState,
}: ButtonProps) => {
  // probably will remove state from button because forms are often the ones that need state
  const handleClick = () => {
    setState(state + 1);
  };

  const buttonSizes = {
    small: "w-24 h-10",
    medium: "w-32 h-14",
    large: "w-40 h-16",
  };

  const buttonColors = {
    blue: "bg-blue-500 hover:bg-blue-700 active:bg-blue-800",
    green: "bg-green-500 hover:bg-green-700 active:bg-green-800",
    red: "bg-red-500 hover:bg-red-700 active:bg-red-800",
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        buttonSizes[size],
        buttonColors[color],
        "btn h-10 w-16 text-white"
      )}
    >
      <div>{name.toUpperCase()}</div>
      {state}
    </button>
  );
};

export default Button;
