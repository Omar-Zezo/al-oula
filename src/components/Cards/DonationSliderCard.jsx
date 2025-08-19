import parse from "html-react-parser";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SRW } from "../../images/svg";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/slices/cart/addToCart";
import { t } from "i18next";

const DonationSliderCard = ({
  setShowDonatePopUp,
  setShowLogin,
  setShowGiftPopUp,
  getDonation,
  slide,
}) => {
  const [price, setPrice] = useState(
    slide?.basic_service_value ? slide?.basic_service_value : 0
  );
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  return (
    <div className="container absolute left-1/2 translate-x-[-50%]">
      <div className="w-full flex justify-between relative">
        <div className="w-[48%] max-xl:w-full px-10 h-[680px] max-xl:h-[650px] max-xl:py-[100px] absolute right-0 top-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-[#C6ABCE] to-[#814494] rounded-tl-[50px] rounded-br-[50px]">
          <div className="flex flex-col gap-5">
            {/* <div className="flex flex-col items-center">
              <p className="text-[60px] max-xl:text-[40px] text-center text-white font-bold">
                500
              </p>
              <h3 className="text-3xl max-xl:text-2xl mt-[-10px] text-white font-semibold">
                {t('days left')}
              </h3>
            </div> */}

            <div className="flex flex-col gap-4">
              <p className="text-4xl max-xl:text-3xl text-center text-white font-bold">
                {slide?.title}
              </p>
              <h3 className="text-xl text-white font-medium description2 max-xl:hidden">
                {slide ? parse(slide?.content) : null}
              </h3>
            </div>
          </div>

          <div className="w-full mt-10 max-xl:mt-5 flex items-center justify-between">
            <p className="text-3xl max-lg:text-2xl mx-1 text-white font-medium">
              {Math.round(slide?.percent)}%
            </p>
            <div className="w-[85%] relative">
              <div className="w-full h-4 bg-white rounded-[50px]"></div>
              <div
                style={{ width: `${Math.round(slide?.percent)}%` }}
                className="w-[80%] h-8 bg-gradient-to-r from-[#814494] to-[#C6ABCE] absolute left-[-2px] top-[-8px] rounded-[50px]"
              ></div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-5 max-xl:mt-3">
            <p className="text-[70px] max-xl:text-[50px] flex items-center text-center text-white font-bold">
              {slide?.target_value - slide?.collected_value}
              <img width={24} src={SRW} alt="sr" className="mr-2" />
            </p>
            <h3 className="text-2xl mt-[-10px] text-white font-semibold">
              {t('remaining amount')}
            </h3>
          </div>

          <div className="xl:w-[90%] max-xl:p-5 w-full max-xl:flex-col max-xl:gap-2 mt-10 max-xl:mt-5 flex items-center justify-between px-3 py-2 rounded-[50px] bg-white shadow-sm shadow-white">
            <Link
              to={`/services-sections/service/${slide?.id}`}
              className="w-fit max-xl:w-full px-6 h-16 max-xl:h-12 flex items-center justify-center text-xl font-bold text-mainColor border-2 border-mainColor rounded-[50px] hover:translate-x-[-4px] duration-300"
            >
              {t('details')}
            </Link>
            <button
              onClick={() => {
                setShowDonatePopUp(true);
                getDonation(slide, price);
              }}
              className="w-fit px-6 max-xl:w-full h-16 max-xl:h-12 flex items-center justify-center text-xl font-bold text-white bg-mainColor rounded-[50px] hover:translate-x-1 duration-300"
            >
              {t('donate')}
            </button>
            <button
              onClick={() => {
                token === null ? setShowLogin(true) : setShowGiftPopUp(true);
                getDonation(slide, price);
                token === null && localStorage.setItem("service_id_Slider", `/services-sections/service/${slide?.id}`) 
              }}
              className="w-fit px-6 max-xl:w-full h-16 max-xl:h-12 flex items-center justify-center text-xl font-bold text-white bg-mainColor rounded-[50px] hover:translate-x-1 duration-300"
            >
              {t('gift')}
            </button>
            <div
              onClick={() => {
                token === null
                  ? setShowLogin(true)
                  : dispatch(
                      addItemToCart({
                        quantity: 1,
                        amount: slide?.basic_service_value,
                        id: slide?.id,
                      })
                    );
              }}
              className="size-14 border-2 text-mainColor border-mainColor shadow-lg flex justify-center items-center rounded-full hover:bg-mainColor hover:text-white duration-300 cursor-pointer"
            >
              <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
            </div>
          </div>
        </div>
        <div className="w-[60%] max-xl:hidden h-[450px] rounded-tl-2xl pt-10 absolute left-0 top-[110px]">
          <img
            src={slide?.image_path}
            alt="img"
            className="size-full object-cover rounded-tl-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default DonationSliderCard;
