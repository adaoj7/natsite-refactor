// import clsx from "clsx";

type CardProps = {
  image?: string;
  textSide?: "left" | "right";
  title: string;
  content: string;
  children?: React.ReactNode;
  placement?: string;
};

export default function Card({
  image,
  content,
  title,
  children,
  // placement,
}: CardProps) {
  // if (textSide === "left") {
  //   return (
  //     <div className="card card-side bg-secondary flex flex-row m-8">
  //       <div className="card-body w-full">
  //         <h2 className="card-title flex justify-center text-black">{title}</h2>
  //         <div className="flex items-center text-black">
  //           {children || content}
  //         </div>
  //       </div>
  //       <figure className="p-8">
  //         <img src={image} />
  //       </figure>
  //     </div>
  //   );
  // }

  return (
    <div className="card bg-secondary flex flex-col m-8">
      {" "}
      <div className="card-body w-full">
        <h2 className="card-title flex justify-center text-black">{title}</h2>
        <div className=" text-black">{children || content}</div>
      </div>
      {image && (
        <figure className="">
          <img
            // className={clsx("object-none", placement)}
            // className="object-center"
            src={image}
          />
        </figure>
      )}
    </div>
  );
}
