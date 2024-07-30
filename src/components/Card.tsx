type CardProps = {
  image: string;
  textSide?: "left" | "right";
  title: string;
  content: string;
};

export default function Card({
  image,
  textSide = "right",
  content,
  title,
}: CardProps) {
  if (textSide === "left") {
    return (
      <div className="card card-side bg-gray-500 flex flex-row m-8">
        <div className="card-body w-full">
          <h2 className="card-title flex justify-center">{title}</h2>
          <p className="flex items-center">{content}</p>
        </div>
        <figure className="p-8">
          <img src={image} />
        </figure>
      </div>
    );
  }

  return (
    <div className="card card-side bg-gray-500 flex flex-row m-8">
      {" "}
      <figure className="p-8">
        <img src={image} />
      </figure>
      <div className="card-body w-full">
        <h2 className="card-title flex justify-center">{title}</h2>
        <div className="mt-4">
          <p className="my-4">{content}</p>
        </div>
      </div>
    </div>
  );
}
