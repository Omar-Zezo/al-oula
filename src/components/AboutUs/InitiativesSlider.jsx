// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

import InitiativeCard from "../Cards/InitiativeCard";

export default function InitiativesSlider({initiativesList}) {


  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper h-[470px] about-home-slider w-full`}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={false}
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {initiativesList?.map((initiative) => (
          <SwiperSlide key={initiative?.id}>
            <InitiativeCard key={initiative?.id} initiative={initiative}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
