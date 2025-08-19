import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { DonationBg } from "../../images/imgs";
import SaidAboutusCard from "../Cards/SaidAboutusCard";
import { getClientOpinions } from "../../store/slices/about us/clientOpinions";
import { t } from "i18next";

export default function SaidAboutus() {
  const [opinionsList, setOpinionsList] = useState(null);
  const { data } = useSelector((state) => state.clientOpinions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientOpinions());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setOpinionsList(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <div className="relative mt-[100px]">
      <div className="flex flex-col items-center absolute top-0 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t('said about us')}
        </h2>
      </div>
      <div className="mt-[200px] max-xl:mt-[100px] mb-[350px] h-[500px] max-xl:h-[300px] relative">
        <img
          src={DonationBg}
          alt="bg-donation"
          className="size-full absolute top-[100px] left-0"
        />

        <Swiper
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          className="mySwiper donation h-[700px]"
        >
          {opinionsList?.map((opinion) => (
            <SwiperSlide key={opinion?.id}>
              <SaidAboutusCard opinion={opinion}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="custom-next max-xl:hidden">
          <FontAwesomeIcon
            className="absolute top-[480px] right-[65%] cursor-pointer z-10 text-mainColor hover:opacity-90 duration-300 text-5xl"
            icon={faArrowRight}
          />
        </button>
        <button className="custom-prev max-xl:hidden">
          <FontAwesomeIcon
            className="absolute top-[480px] left-[27%] cursor-pointer z-10 text-mainColor hover:opacity-90 duration-300 text-5xl"
            icon={faArrowLeft}
          />
        </button>
      </div>
    </div>
  );
}
