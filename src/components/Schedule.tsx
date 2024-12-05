import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "./Gallery.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type GalleryProps = {
  schedule: {
    id: string;
    name: string;
    schedule: Schedule[];
  }[];
};

interface Schedule {
  time: string;
  performer: string;
  details: string;
}

export default function Schedule({ schedule }: GalleryProps) {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="phone:block desktop:hidden">
        <GalleryMobile schedule={schedule} />
      </div>
      <div className="relative mx-auto max-w-full overflow-x-hidden phone:hidden desktop:block">
        <GalleryDesktop schedule={schedule} />
      </div>
    </div>
  );
}

function GalleryMobile({ schedule }: GalleryProps) {
  const slides = schedule.map((day) => (
    <SwiperSlide key={day.id} className="pb-12">
      <div className="flex flex-col">
        <div className="text-2xl">{day.name}</div>
        {day.schedule.map((item) => (
          <div key={item.time} className="my-2 flex flex-col text-start">
            <span className="font-semibold">{item.performer}</span>
            <span className="">{item.time}</span>
            <span>{item.details}</span>
          </div>
        ))}
      </div>
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
    <Swiper
      style={{
        ...customStyles,
        width: "100%",
        maxWidth: "100%",
      }}
      modules={[Pagination, A11y, Navigation, Autoplay]}
      navigation={{
        enabled: true,
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      }}
      autoHeight={true}
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
  );
}

function GalleryDesktop({ schedule }: GalleryProps) {
  const slides = schedule.map((day) => (
    <SwiperSlide key={day.id} className="pb-12">
      <div className="flex flex-col">
        <div className="mb-4 text-2xl">{day.name}</div>
        {day.schedule.map((item) => (
          <div key={item.time} className="grid grid-cols-[auto,1fr,auto]">
            <span className="w-20 text-start">{item.time}</span>
            <span className="ml-12 text-start font-semibold">
              {item.performer}
            </span>
            <span className="w-44">{item.details}</span>
          </div>
        ))}
      </div>
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
    <div className="relative mx-auto max-w-4xl overflow-x-hidden bg-white px-4">
      <div
        className="schedule-button-next swiper-button right-0 top-[45%] text-secondary"
        role="button"
        aria-label="Next"
        aria-disabled={false}
      >
        <IoIosArrowForward size={50} />
      </div>
      <div
        className="schedule-button-prev swiper-button left-0 top-[45%] text-secondary"
        role="button"
        aria-label="Previous"
        aria-disabled={false}
      >
        <IoIosArrowBack size={50} />
      </div>
      <div className="w-full">
        <Swiper
          style={{
            ...customStyles,
          }}
          modules={[Pagination, Navigation, A11y, Autoplay]}
          navigation={{
            enabled: true,
            nextEl: ".schedule-button-next",
            prevEl: ".schedule-button-prev",
            disabledClass: "swiper-button-disabled",
          }}
          autoplay={{
            delay: 300000,
            disableOnInteraction: true,
          }}
          autoHeight={true}
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
  );
}
