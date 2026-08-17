// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import NewsCard from "../Cards/NewsCard";

export default function NewsSlider({ news }) {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper h-[350px] about-home-slider w-full`}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
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
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {news?.slice(0, 6).map((art) => (
          <SwiperSlide key={art?.id}>
            <NewsCard key={art?.id} art={art} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
