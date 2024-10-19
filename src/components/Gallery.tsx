import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "./Gallery.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface GalleryProps {
  images?: { id: number; src: string; alt: string }[];
  testimonials?: { id: number; quote: string; source?: string }[];
  type: "images" | "testimonials";
  autoplayConfig?:
    | boolean
    | {
        delay: number;
        disableOnInteraction: boolean;
      };
}

export default function Gallery({ images, testimonials, type }: GalleryProps) {
  const autoplayConfig =
    type === "testimonials"
      ? {
          delay: 5000,
          disableOnInteraction: false,
        }
      : {
          delay: 8000,
          disableOnInteraction: false,
        };

  return (
    <>
      <div className="phone:block desktop:hidden">
        <GalleryMobile
          images={images}
          testimonials={testimonials}
          type={type}
          autoplayConfig={autoplayConfig}
        />
      </div>
      <div className="phone:hidden desktop:block">
        <GalleryDesktop
          images={images}
          testimonials={testimonials}
          type={type}
          autoplayConfig={autoplayConfig}
        />
      </div>
    </>
  );
}

function GalleryMobile({
  images,
  testimonials,
  type,
  autoplayConfig,
}: GalleryProps) {
  let slides;
  if (type === "images" && images) {
    slides = images.map((image) => (
      <SwiperSlide key={image.id}>
        <img
          src={image.src}
          alt={image.alt}
          className="h-[250px] w-[400px] select-none object-cover"
        />
      </SwiperSlide>
    ));
  } else if (type === "testimonials" && testimonials) {
    slides = testimonials.map((testimonial) => (
      <SwiperSlide key={testimonial.id}>
        <div>{testimonial.quote}</div>
        <div>{testimonial.source}</div>
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
    <div className="card">
      <div className="card-body">
        <div className="card-title my-2 justify-center text-2xl">Gallery</div>
        <Swiper
          style={customStyles}
          modules={[Pagination, A11y, Navigation, Autoplay]}
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
          autoplay={autoplayConfig}
        >
          {slides}
        </Swiper>
      </div>
    </div>
  );
}

function GalleryDesktop({
  images,
  testimonials,
  type,
  autoplayConfig,
}: GalleryProps) {
  let slides;
  if (type === "images" && images) {
    slides = images.map((image) => (
      <SwiperSlide key={image.id}>
        <img
          src={image.src}
          alt={image.alt}
          className="h-[450px] w-[600px] select-none object-cover"
        />
      </SwiperSlide>
    ));
  } else if (type === "testimonials" && testimonials) {
    slides = testimonials.map((testimonial) => (
      <SwiperSlide key={testimonial.id}>
        <div className="flex h-[300px] max-w-[600px] flex-col justify-center">
          <div className="text-2xl">{testimonial.quote}</div>
          {testimonial.source && (
            <div className="text-lg">- {testimonial.source}</div>
          )}
        </div>
      </SwiperSlide>
    ));
  } else {
    slides = (
      <SwiperSlide>
        <div>No slides</div>
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
    <div className="">
      <div className="relative w-full">
        <div className="swiper-button-next swiper-button right-44 top-[45%] text-secondary">
          <IoIosArrowForward size={50} />
        </div>
        <div className="swiper-button-prev swiper-button left-44 top-[45%] text-secondary">
          <IoIosArrowBack size={50} />
        </div>
        <div>
          <Swiper
            style={customStyles}
            modules={[Pagination, A11y, Navigation, Autoplay]}
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
            autoplay={autoplayConfig}
          >
            {slides}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
