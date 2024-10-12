import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "./Gallery.css";
// import { images } from "../data/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface GalleryProps {
  images: { id: number; src: string; alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <>
      <GalleryMobile images={images} />
      <GalleryDesktop images={images} />
    </>
  );
}

function GalleryMobile({ images }: GalleryProps) {
  return <div className="phone:block desktop:hidden">GalleryMobile</div>;
}

function GalleryDesktop({ images }: GalleryProps) {
  console.log("images", images);
  let slides;
  if (images) {
    slides = images.map((image) => (
      <SwiperSlide key={image.id}>
        <img
          src={image.src}
          alt={image.alt}
          className="h-[450px] w-[600px] select-none object-cover"
        />
      </SwiperSlide>
    ));
  } else {
    slides = (
      <SwiperSlide>
        <div>No images</div>
      </SwiperSlide>
    );
  }

  const customStyles = {
    "--swiper-pagination-color": "#6B705C",
    "--swiper-pagination-bullet-inactive-color": "#DDBEA9",
    "--swiper-pagination-bullet-inactive-opacity": "2",
    "--swiper-pagination-bullet-size": "8px",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
  } as React.CSSProperties;

  return (
    <>
      <div className="relative hidden w-full desktop:block">
        <div className="swiper-button-next swiper-button right-44 top-[45%] text-secondary">
          <IoIosArrowForward size={50} />
        </div>
        <div className="swiper-button-prev swiper-button left-44 top-[45%] text-secondary">
          <IoIosArrowBack size={50} />
        </div>
        <div>
          <Swiper
            style={customStyles}
            modules={[Pagination, A11y, Navigation]}
            navigation={{
              enabled: true,
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            className="mySwiper"
          >
            {slides}
          </Swiper>
        </div>
      </div>
    </>
  );
}
