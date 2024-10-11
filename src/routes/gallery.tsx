import Spacer from "../components/Spacer";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Virtual,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "./gallery.css";
import { images } from "../data/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Gallery() {
  // const slides = images.map((image, index) => (
  //   <SwiperSlide className="" key={image.id}>
  //     <img
  //       src={image.src}
  //       alt={image.alt}
  //       className="h-[450px] w-[600px] select-none object-cover"
  //     />
  //   </SwiperSlide>
  // ));
  const slides = images.map((image, index) => (
    <SwiperSlide className="" key={image.id}>
      <img
        src={image.src}
        alt={image.alt}
        className="h-[450px] w-[600px] select-none object-cover"
      />
    </SwiperSlide>
  ));

  const customStyles = {
    "--swiper-pagination-color": "#6B705C",
    "--swiper-pagination-bullet-inactive-color": "#DDBEA9",
    "--swiper-pagination-bullet-inactive-opacity": "2",
    "--swiper-pagination-bullet-size": "8px",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
  } as React.CSSProperties;

  return (
    <>
      <Spacer />
      <div className="relative h-full w-full">
        <div className="swiper-button-next swiper-button right-44 top-[45%] text-secondary">
          <IoIosArrowForward size={50} />
        </div>
        <div className="swiper-button-prev swiper-button left-44 top-[45%] text-secondary">
          <IoIosArrowBack size={50} />
        </div>
        <div className="my-12">
          <h1 className="card-title flex justify-center text-2xl">Gallery</h1>
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
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="mySwiper my-10"
          >
            {slides}
          </Swiper>
        </div>
      </div>
    </>
  );
}
