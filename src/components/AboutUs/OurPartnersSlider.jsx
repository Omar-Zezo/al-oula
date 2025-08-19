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
import { getPartnersHome } from "../../store/slices/Home/partnersHome";

export default function OurPartnersSlider() {
  const [PartnersList, setPartnersList] = useState(null);
  const { data } = useSelector((state) => state.partnersHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnersHome('limit=7'));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setPartnersList(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper ${
          PartnersList?.length < 6 && "slider-center"
        } prize about-home-slider px-10 w-full`}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        autoplay={{
          "delay": 2500,
          "disableOnInteraction": true
        }}
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
        {PartnersList?.length > 6 ? (
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
        {PartnersList?.map((partner) => (
          <SwiperSlide key={partner?.id}>
            <div>
              <a href={partner?.url} target="_blank" className="w-fit pt-5 bg-white flex flex-col items-center justify-center rounded-2xl rounded-bl-none border-[8px] border-slate-100 duration-200 prize-card">
              <img
                width={200}
                src={partner?.logo}
                alt="prize"
                className="size-[150px] object-contain rounded-md grayscale"
              />
              <h5 className="w-full invisible text-center py-1 text-xl text-white bg-mainColor font-semibold description1">
                {partner?.name}
              </h5>
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}