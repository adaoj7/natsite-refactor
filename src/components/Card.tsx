// import clsx from "clsx";

import clsx from "clsx";
import { Link } from "react-router-dom";

type CardProps = {
  image?: string;
  title?: string;
  content: string;
  children?: React.ReactNode;
  placement?: string;
  imgPosition?: "object-center" | "object-top" | "object-bottom";
  page?: string;
  bg?: "primary" | "secondary" | "accent" | "neutral" | "none";
};

export default function Card({
  image,
  content,
  title,
  children,
  imgPosition = "object-center",
  page,
  bg = "none",
}: CardProps) {
  const backgroundColors = {
    none: "",
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    neutral: "bg-neutral",
  };

  return (
    <div className={clsx("card", backgroundColors[bg])}>
      {" "}
      <div className="card-body w-full">
        {title && (
          <h2 className="card-title mb-4 justify-center text-3xl">{title}</h2>
        )}
        <div>{children || content}</div>
      </div>
      {image && (
        <figure className="">
          <img
            className={clsx(
              "h-[200px] w-[300px] object-cover desktop:h-[450px] desktop:w-[700px]",
              imgPosition
            )}
            src={image}
          />
        </figure>
      )}
      {page && (
        <Link to={page} className="btn">
          Read More
        </Link>
      )}
    </div>
  );
}
