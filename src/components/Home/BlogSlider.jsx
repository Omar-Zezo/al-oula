// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import BlogCard from "../Cards/BlogCard";

export default function BlogSlider({blogs}) {

  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper h-[470px] about-home-slider w-full`}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          "delay": 2000,
          "disableOnInteraction": false
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {blogs?.map((blog) => (
          <SwiperSlide key={blog?.id}>
            <BlogCard key={blog?.id} blog={blog}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
