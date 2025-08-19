// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MediaFileCard from "../Cards/MediaFileCard";

export default function MediaSlider({ files }) {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper media-slider w-[90%]`}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {files?.map((file) => (
          <SwiperSlide key={file?.id}>
            <div
              className="overflow-hidden"
              key={file?.id}
            >
              <MediaFileCard file={file} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-prev mt-10 max-xl:hidden">
        <FontAwesomeIcon
          className="absolute bottom-1/2 translate-y-[-50%] left-0 cursor-pointer z-10 text-mainColor hover:text-mainColor duration-300 text-[50px]"
          icon={faChevronLeft}
        />
      </button>

      <button className="custom-next mt-10 max-xl:hidden">
        <FontAwesomeIcon
          className="absolute bottom-1/2 translate-y-[-50%] right-0 cursor-pointer z-10 text-mainColor hover:text-mainColor duration-300 text-[50px]"
          icon={faChevronRight}
        />
      </button>
    </div>
  );
}
