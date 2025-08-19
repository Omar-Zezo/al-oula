import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { LeftPrize, RightPrize } from "../../images/imgs";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import { getOurPrizes } from "../../store/slices/Home/ourPrizes";
import { Link } from "react-router-dom";

export default function OurPrizeSlider() {
  const [prizesList, setPrizesList] = useState(null);
  const { data } = useSelector((state) => state.ourPrizes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOurPrizes());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setPrizesList(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        className={`mySwiper ${
          prizesList?.length < 6 && "slider-center"
        } prize about-home-slider px-10 w-full`}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {prizesList?.length > 6 ? (
          <>
            <img
              src={RightPrize}
              alt=""
              className="absolute top-[-20px] right-[-35px] z-10 max-xl:hidden"
            />
            <img
              src={LeftPrize}
              alt=""
              className="absolute top-[-20px] left-[-35px] z-10 max-xl:hidden"
            />
          </>
        ) : null}
        {prizesList?.map((prize) => (
          <SwiperSlide
            className="w-[216px] max-xl:w-full  flex flex-col items-center justify-center rounded-2xl rounded-bl-none border-[8px] border-slate-100 duration-200 prize-card"
            key={prize?.id}
          >
            <Link to={`/award-details/${prize?.slug}`}>
              <img
                src={prize?.image_path}
                alt="prize"
                className="size-[200px] mx-auto object-contain rounded-md grayscale hover:grayscale-0"
              />
              <h5 className="w-full invisible text-center py-1 text-xl text-white bg-mainColor font-semibold description1">
                {prize?.title}
              </h5>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
