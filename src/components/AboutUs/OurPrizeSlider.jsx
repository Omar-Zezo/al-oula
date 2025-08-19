import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { LeftPrize, RightPrize } from "../../images/imgs";

// import required modules
import { Navigation } from 'swiper/modules';

import { useDispatch, useSelector } from "react-redux";
import {getOurPrizes} from '../../store/slices/Home/ourPrizes'

export default function OurPartnerInitiativeSlider({partners}) {
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

  console.log(partners)


  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper ${partners?.length < 6 && "slider-center"} px-10 w-full`}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
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
        {
          partners?.length > 6 ? (
            <>
            <img src={RightPrize} alt="" className="absolute top-[-70px] right-[-10px] z-10"/>
            <img src={LeftPrize} alt="" className="absolute top-[-70px] left-[-10px] z-10"/>
            </>
          ):null
        }
        {partners?.map((partner) => (
          <SwiperSlide key={partner?.id}>
            <div className="w-fit pt-5 bg-white flex flex-col items-center justify-center rounded-2xl rounded-bl-none border-[8px] border-slate-100 duration-200 prize-card">
              <img
                width={200}
                src={partner?.logo}
                alt="prize"
                className="size-[200px] object-contain rounded-md grayscale hover:grayscale-0"
              />
              <h5 className="w-full invisible text-center py-1 text-xl text-white bg-mainColor font-semibold description1">{partner?.name}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
