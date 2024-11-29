import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "./Gallery.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";

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

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

function useImagePreloader(images: string[]) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      Promise.all(images.map(preloadImage)).then(() => setLoaded(true));
    } catch (error) {
      console.error("Error preloading images", error);
    }
  }, [images]);

  return loaded;
}

export default function Gallery({ images, testimonials, type }: GalleryProps) {
  const imagesLoaded = useImagePreloader(
    images?.map((image) => image.src) ?? []
  );

  if (!imagesLoaded)
    return (
      <div className="flex justify-center">
        <div className="loading loading-spinner loading-lg h-full text-secondary phone:mt-20 desktop:mt-32"></div>
      </div>
    );

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
      <div className="max-w-screen phone:hidden desktop:block">
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
  );
}
