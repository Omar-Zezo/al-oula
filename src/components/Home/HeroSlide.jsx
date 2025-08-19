import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getHeroSlider } from "../../store/slices/Home/heroSlider";
import { Link } from "react-router-dom";

export default function HeroSlide({ langDetection }) {
  const [slides, setSlides] = useState(null);
  const { data } = useSelector((state) => state.heroSlider);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHeroSlider());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.data) {
            setSlides(data.data.data.data);
          }
        }
      }
    }
  }, [data]);

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        className="mySwiper hero xl:h-[870px] max-md:h-[300px] h-[550px]"
      >
        {slides?.map((slide) =>
          slide?.url ? (
            <SwiperSlide key={slide?.id} className="xl:pt-[180px]">
              <div>
                <Link to={slide?.url}>
                  <div className="container h-full absolute left-1/2 translate-x-[-50%] flex justify-between">
                    <div
                      className={`w-[48%] max-xl:w-[65%] ${
                        slide?.style?.content_vertical_align === "center"
                          ? "mx-auto items-center"
                          : slide?.style?.content_vertical_align === "start"
                          ? `${
                              langDetection === "en"
                                ? "ml-auto items-end"
                                : "mr-auto items-end"
                            }`
                          : slide?.style?.content_vertical_align === "end"
                          ? `${
                              langDetection === "en"
                                ? "mr-auto items-start"
                                : "ml-auto items-end"
                            }`
                          : null
                      } h-full z-10 flex flex-col xl:pt-[200px] pt-[130px] gap-2`}
                    >
                      <p
                        style={{ color: slide?.style?.title_color }}
                        className="text-white text-[50px] max-xl:text-xl font-semibold"
                      >
                        {slide?.title}
                      </p>
                      <p
                        style={{ color: slide?.style?.short_title_color }}
                        className={`text-white text-[40px] ${
                          langDetection === "en" ? "mr-auto" : "ml-auto"
                        } max-xl:text-lg font-semibold`}
                      >
                        {slide?.short_title}
                      </p>
                    </div>
                  </div>
                </Link>
                <img
                  src={slide?.img}
                  alt="hero-img"
                  className="size-full object-cover max-xl:object-center absolute z-[-1] bottom-0 left-0"
                />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={slide?.id} className="xl:pt-[180px]">
              <div className="container h-full absolute left-1/2 translate-x-[-50%] flex justify-between">
                <div
                  className={`w-[48%] ${
                    slide?.style?.content_vertical_align === "center"
                      ? "mx-auto items-center"
                      : slide?.style?.content_vertical_align === "start"
                      ? `${
                          langDetection === "en"
                            ? "ml-auto items-end"
                            : "mr-auto items-end"
                        }`
                      : slide?.style?.content_vertical_align === "end"
                      ? `${
                          langDetection === "en"
                            ? "mr-auto items-start"
                            : "ml-auto items-end"
                        }`
                      : null
                  } h-full z-10 flex flex-col xl:pt-[200px] pt-[130px] gap-2`}
                >
                  <p
                    style={{ color: slide?.style?.title_color }}
                    className="text-white text-[50px] max-xl:text-3xl font-semibold"
                  >
                    {slide?.title}
                  </p>
                  <p
                    style={{ color: slide?.style?.short_title_color }}
                    className={`text-white text-[40px] ${
                      langDetection === "en" ? "mr-auto" : "ml-auto"
                    } max-xl:text-3xl font-semibold`}
                  >
                    {slide?.short_title}
                  </p>
                </div>
              </div>

              <img
                src={slide?.img}
                alt="hero-img"
                className="size-full object-cover max-xl:object-center absolute z-[-1] bottom-0 left-0"
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </>
  );
}
