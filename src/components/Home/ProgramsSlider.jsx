// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import { HappyFamily } from "../../images/imgs";

export default function ProgramsSlider({ cardsList, setProgramDetails, setShowDetails }) {

  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        className={`mySwiper about-home-slider w-full`}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation={false}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
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
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1028: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <div
            style={{
              background: `url('${HappyFamily}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="w-[198px] max-md:w-full max-md:h-[550px] xl:h-[539px] h-[443px] px-5 flex flex-col gap-5 justify-center items-center bg-mainColor rounded-tr-[60px] rounded-bl-[60px] rounded-br-3xl rounded-tl-3xl"
          >
            <h3 className="text-3xl text-center text-white font-semibold">
              {cardsList?.programs_overview?.title}
            </h3>
            <p className="text-lg text-white text-center font-medium">
              {cardsList?.programs_overview?.description}
            </p>
          </div>
        </SwiperSlide>
        {cardsList?.programs?.map((item) => (
          <SwiperSlide key={item?.id} className="mt-auto">
            <div
              className="shrink-0 max-md:h-[550px] cursor-pointer relative"
              onClick={() => {
                setProgramDetails(item);
                setShowDetails(true);
              }}
            >
              <img
                src={item?.image_path}
                alt=""
                className="size-full object-contain"
              />
              <h4 className="w-[90%] absolute left-1/2 translate-x-[-50%] bottom-5 text-2xl text-center text-white font-bold">
                {item?.title}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}