// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import DonationSliderCard from "../Cards/DonationSliderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function DonationSlider({ slides, setShowDonatePopUp, setShowGiftPopUp, getDonation, setShowLogin }) {
 
  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": true
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper donation h-[700px] max-xl:h-[850px]"
      >
        {slides?.map((slide) => (
          <SwiperSlide key={slide?.id}>
            <DonationSliderCard
              slide={slide}
              setShowDonatePopUp={setShowDonatePopUp}
              getDonation={getDonation}
              setShowGiftPopUp={setShowGiftPopUp}
              setShowLogin={setShowLogin}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="custom-next max-xl:hidden">
        <FontAwesomeIcon
          className="absolute top-[480px] right-[65%] cursor-pointer z-10 text-white hover:text-mainColor duration-300 text-5xl"
          icon={faArrowRight}
        />
      </button>
      <button className="custom-prev max-xl:hidden">
        <FontAwesomeIcon
          className="absolute top-[480px] left-[27%] cursor-pointer z-10 text-white hover:text-mainColor duration-300 text-5xl"
          icon={faArrowLeft}
        />
      </button>
    </>
  );
}
