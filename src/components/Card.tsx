type CardProps = {
  image: string;
  side?: "left" | "right";
  content: string;
};

export default function Card({ image, side = "right", content }: CardProps) {
  if (side === "left") {
    return (
      <div className="card card-side flex flex-row m-8">
        <div className="card-body w-full">
          <h2 className="card-title flex justify-center">Vi Heinz</h2>
          <p className="flex items-center">{content}</p>
        </div>
        <figure className="p-8">
          <img src={image} />
        </figure>
      </div>
    );
  }

  return (
    <div className="card card-side flex flex-row m-8">
      {" "}
      <figure className="p-8">
        <img src={image} />
      </figure>
      <div className="card-body w-full">
        <h2 className="card-title flex justify-center">Dr. Gregg Stoner</h2>
        <div className="mt-4">
          <p className="my-4">{content}</p>
        </div>
      </div>
    </div>
  );
}
