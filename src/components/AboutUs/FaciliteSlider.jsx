// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

export default function FaciliteSlider({ images }) {
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper h-[300px] facilties-slider w-full`}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={true}
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
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {images?.map((image) => (
          <SwiperSlide>
            <img
              src={image}
              alt="hall-img"
              className="size-full object-cover rounded-md"
            />
            ssss
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
