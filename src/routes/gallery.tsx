import Gallery from "../components/Gallery";
import Spacer from "../components/Spacer";
import { images } from "../data/images";

// interface galleryProps {}

export function GalleryPage() {
  return (
    <>
      <Spacer />

      <Gallery images={images} />
    </>
  );
}
