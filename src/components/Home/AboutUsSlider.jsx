import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion"


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { WhiteLogo } from "../../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAboutSliderHome } from "../../store/slices/Home/aboutSliderHome";

export default function AboutUsSlider() {
  const [slidesList, setSlidesList] = useState(null);

  const { data } = useSelector((state) => state.aboutSliderHome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutSliderHome());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.data) {
            setSlidesList(data.data.data.data);
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="mt-[120px]">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          "delay": 2000,
          "disableOnInteraction": false
        }}
        className="mySwiper about-home-slider h-[400px] max-xl:h-[250px]"
      >
        {slidesList?.map((slide) => (
          <SwiperSlide key={slide?.id}>
            <div className="w-full h-[354px] max-xl:h-[200px] relative bg-mainColor max-xl:bg-transparent">
              <div className="flex justify-center">
                <div className="w-[70%] max-xl:w-full h-[355px] max-xl:h-[200px] xl:rounded-tl-full xl:rounded-bl-xl absolute right-0 top-[-1px]">
                  <img
                    height={355}
                    src={slide?.img}
                    alt="img"
                    className="size-full object-cover xl:rounded-tl-[286px] xl:rounded-bl-[62px]"
                  />
                  <div className="size-full xl:rounded-tl-[286px] xl:rounded-bl-[62px] absolute top-0 left-0 z-10 opacity-70 bg-gradient-to-t from-[#C6ABCE] to-[#814494]"></div>
                  <div className="size-full rounded-tl-[286px] rounded-bl-[62px] flex flex-col gap-4 items-center justify-center absolute top-0 left-0 z-[20]">
                    <FontAwesomeIcon
                      className="text-white text-5xl"
                      icon={faQuoteRight}
                    />
                    <p className="text-4xl text-white text-center left-9 font-semibold">
                      {slide?.title}
                    </p>
                  </div>
                </div>
                <img
                  className="w-[18%] max-xl:hidden object-cover rounded-l-full absolute left-[6%] top-1/2 z-[15] translate-y-[-50%]"
                  src={WhiteLogo}
                  alt="logo"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
