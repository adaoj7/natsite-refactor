type CardProps = {
  image?: string;
  textSide?: "left" | "right";
  title: string;
  content: string;
  children?: React.ReactNode;
};

export default function Card({
  image,
  textSide = "right",
  content,
  title,
  children,
}: CardProps) {
  if (textSide === "left") {
    return (
      <div className="card card-side bg-secondary flex flex-row m-8">
        <div className="card-body w-full">
          <h2 className="card-title flex justify-center text-black">{title}</h2>
          <div className="flex items-center text-black">
            {children || content}
          </div>
        </div>
        <figure className="p-8">
          <img src={image} />
        </figure>
      </div>
    );
  }

  return (
    <div className="card card-side bg-secondary flex flex-row m-8">
      {" "}
      {image && (
        <figure className="p-8">
          <img src={image} />
        </figure>
      )}
      <div className="card-body w-full">
        <h2 className="card-title flex justify-center text-black">{title}</h2>
        <div className="mt-4">
          <p className="my-4 text-black">{children || content}</p>
        </div>
      </div>
    </div>
  );
}
