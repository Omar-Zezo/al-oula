import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import MediaCenterImgCard from "../Cards/MediaCenterImgCard";
import { getViewPhotos } from "../../store/slices/media cnter/viewPhotos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function MediaCenterImagesSlider({
  selectedSectionId,
  getImageToView,
  setShowPopSlider,
}) {
  const [imagesOfSection, setImagesOfSection] = useState(null);

  const { data } = useSelector((state) => state.viewPhotos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedSectionId) {
      dispatch(getViewPhotos(selectedSectionId));
    }
  }, [selectedSectionId]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.photos) {
            if (data.data.data.photos.data) {
              console.log(data.data.data.photos.data);
              setImagesOfSection(data.data.data.photos.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className="mySwiper w-full"
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation]}
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {imagesOfSection?.map((image) => (
          <SwiperSlide key={image?.id}>
            <MediaCenterImgCard
              image={image}
              getImageToView={getImageToView}
              setShowPopSlider={setShowPopSlider}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <button className="custom-prev mt-10 max-xl:hidden">
        <FontAwesomeIcon
          className="absolute bottom-0 left-[45%] cursor-pointer z-10 text-mainColor hover:text-mainColor duration-300 text-5xl"
          icon={faArrowLeft}
        />
      </button>

      <button className="custom-next mt-10 max-xl:hidden">
        <FontAwesomeIcon
          className="absolute bottom-0 right-[43%] cursor-pointer z-10 text-mainColor hover:text-mainColor duration-300 text-5xl"
          icon={faArrowRight}
        />
      </button>
    </div>
  );
}
