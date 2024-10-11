import React from "react";
import Gallery from "../components/Gallery";
import Spacer from "../components/Spacer";
import { images } from "../data/images";

interface galleryProps {}

export function GalleryPage() {
  return (
    <>
      <Spacer />
      <div className="phone:flex desktop:hidden">
        <GalleryMobile />
      </div>
      <div className="hidden desktop:flex">
        <GalleryDesktop />
      </div>
    </>
  );
}

export function GalleryMobile() {
  return <Gallery images={images} />;
}

export function GalleryDesktop() {
  return <Gallery images={images} />;
}
