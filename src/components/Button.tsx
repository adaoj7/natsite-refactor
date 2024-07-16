import clsx from "clsx";

type ButtonProps = {
  name: string;
  color: "blue" | "green" | "red";
  state: any;
  setState: any;
};

const Button = ({ name, color, state, setState }: ButtonProps) => {
  const handleClick = () => {
    setState(state + 1);
  };

  const buttonColors = {
    blue: "bg-blue-500 hover:bg-blue-700 active:bg-blue-800",
    green: "bg-green-500 hover:bg-green-700 active:bg-green-800",
    red: "bg-red-500 hover:bg-red-700 active:bg-red-800",
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(buttonColors[color], "btn w-32 h-14 text-white")}
    >
      <div>{name.toUpperCase()}</div>
      {state}
    </button>
  );
};

export default Button;
