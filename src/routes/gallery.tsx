import Gallery from "../components/Gallery";
import Spacer from "../components/Spacer";
import { images } from "../data/images";

// interface galleryProps {}

export function GalleryPage() {
  return (
    <>
      <Spacer />
      <div className="card">
        <div className="card-body">
          <div className="card-title justify-center text-2xl">Gallery</div>
          <Gallery images={images} type="images" />
        </div>
      </div>
    </>
  );
}
