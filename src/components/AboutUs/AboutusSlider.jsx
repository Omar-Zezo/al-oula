import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AboutSlider } from "../../images/imgs";

export default function AboutusSlider({ images }) {
  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation]}
        className="mySwiper about size-full"
      >
        {images?.map((img) => (
          <SwiperSlide>
            <div className="size-full bg-mainColor border-t-[10px] rounded-t-[35px] border-mainColor">
              <img
                src={img}
                alt="about-slider-img"
                className=" size-full rounded-t-[30px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative">
        <button className="custom-next">
          <FontAwesomeIcon
            className="absolute right-[40%] top-[-70px] z-50 cursor-pointer text-white hover:text-mainColor duration-300 text-5xl"
            icon={faArrowRight}
          />
        </button>
        <button className="custom-prev">
          <FontAwesomeIcon
            className="absolute left-[40%] top-[-70px] z-50 cursor-pointer text-white hover:text-mainColor duration-300 text-5xl"
            icon={faArrowLeft}
          />
        </button>
      </div>
    </>
  );
}
