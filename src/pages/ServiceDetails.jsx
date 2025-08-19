import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { AboutCover } from "../images/imgs";
import { getServiceDetails } from "../store/slices/Home/serviceDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import DonateNowPopup from "../utils/DonateNowPopup";
import ScrollToTop from "../utils/ScrollToTop";
import Login from "../utils/Login";
import GiftPopup from "../utils/GiftPopup";
import { Helmet } from "react-helmet";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import { toast } from "react-toastify";
import { SR } from "../images/svg";
import UseLangDetection from "../hooks/UseLangDetection";
import { t } from "i18next";

const ServiceDetails = () => {
  const [details, setDetails] = useState(null);
  const { data } = useSelector((state) => state.serviceDetails);
  const [price, setPrice] = useState(null);
  const [qty, setQty] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showDonatePopUp, setShowDonatePopUp] = useState(false);
  const [showGiftPopUp, setShowGiftPopUp] = useState(false);
  const [giftDetails, setGiftDetails] = useState(null);
  const [donationDetails, setDonationDetails] = useState(null);
  const [multiPrice, setMultiPrice] = useState(null);

  const errorMsg = (msg) => toast.error(msg);

  const token = localStorage.getItem("token");
  const settings = UseSettings();

  useEffect(() => {
    if (
      details?.price_value === "fixed" ||
      details?.price_value === "percent"
    ) {
      setPrice(details?.basic_service_value);
    } else {
      setPrice(details?.multiple_service_values[0]);
    }
  }, [details]);

  //donate now
  const donateNow = () => {
    if (
      details?.price_value === "variable" ||
      details?.price_value === "multi"
    ) {
      if (price) {
        setShowDonatePopUp(true);
        getDonation(details, price);
      } else {
        errorMsg(t('please select your donation amount first'))
      }
    } else {
      setShowDonatePopUp(true);
      getDonation(details, price);
    }
  };

  //gift now
  const giftNow = () => {
    if (token === null) {
      setShowLogin(true);
      localStorage.setItem(
        "service_id_Slider",
        `/services-sections/service/${details?.id}`
      );
    } else {
      if (details?.price_value === "variable") {
        if (price) {
          setShowGiftPopUp(true);
          getDonation(details, price);
        } else {
          errorMsg(t('please select your donation amount first'))
        }
      } else {
        setShowGiftPopUp(true);
        getDonation(details, price);
      }
    }
  };

  const getDonation = (data, price) => {
    setDonationDetails(data);
    setGiftDetails(data);
    setMultiPrice(price);
  };

  const dispatch = useDispatch();

  const { id } = useParams();
  const langDetection = UseLangDetection()


  useEffect(() => {
    if (id) {
      dispatch(getServiceDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setDetails(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <ScrollToTop>
      <Helmet>
        <title>{`${settings?.name} - ${t("donation Details")}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      {!details ? (
        <PageLoader />
      ) : (
        <>
          <div className="xl:h-[400px] h-[200px] bg-mainColor xl:rounded-b-[80px] relative">
            <img
              src={AboutCover}
              alt="about-cover"
              className="size-full absolute left-0 top-0 object-cover xl:rounded-b-[80px]"
            />
            <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 xl:rounded-b-[80px]"></div>
          </div>
          <div
            className={`xl:w-fit w-[90%] xl:px-20 h-[100px] ${
              langDetection === "en" ? "xl:ml-24 mr-auto" : "xl:mr-24"
            } flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]`}
          >
            <p className="text-[40px] max-xl:text-3xl text-white font-semibold">
              {t("donation Details")}
            </p>
          </div>

          <div className="pt-20" dir={langDetection === "en" ? 'ltr':'rtl'}>
            <div className="container flex flex-col gap-4">
              <div className="w-full h-[300px] rounded-xl">
                <img
                  src={details?.image_path}
                  alt="project-img"
                  className="size-full object-cover rounded-xl"
                />
              </div>
              <div className="flex max-xl:flex-col items-center bg-gray-100 xl:p-5 p-2 rounded-xl">
                <div className="w-[60%] max-xl:w-full flex flex-col gap-4 max-xl:order-2">
                  <h3 className="text-[36px] max-xl:text-3xl mt-6 text-secondryColor font-bold">
                    {details?.title}
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl text-[#444] font-bold">
                        {t('service description')}
                      </h3>
                      <p className="lg:w-[90%] text-lg text-[#7e7e7e] font-medium">
                        {details ? parse(details?.content) : null}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="text-2xl text-[#444] font-bold">
                        {t('how the service works')}
                      </h3>
                      <p className="text-lg text-[#7e7e7e] font-medium">
                        {details
                          ? parse(details?.how_does_the_service_work)
                          : null}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-[38%] max-xl:w-full mr-auto flex flex-col gap-4 bg-white p-4 rounded-xl">
                  <p
                    style={{ marginRight: `${Number(details?.percent)}%` }}
                    className={`w-fit px-2 py-1 ${langDetection === "en" ? 'ml-[5%]':'mr-[15%]'} bg-mainColor relative text-white text-sm font-bold rounded-tr-[5px] rounded-tl-[5px] percentage-arrow`}
                  >
                    {details?.percent}
                  </p>
                  <div className="w-[90%] mx-auto h-[9px] bg-[#f1f1f1] relative rounded-md">
                    <div
                      style={{ width: `${Number(details?.percent)}%` }}
                      className={`h-full absolute top-0 ${langDetection === "en" ? 'left-0':'right-0'} bg-mainColor rounded-md`}
                    ></div>
                  </div>
                  <div className="w-[90%] mx-auto flex justify-between pb-[30px] border-b border-[#e4e4e4]">
                    <p className="w-fit flex font-bold items-center text-sm text-[#7e7e7e]">
                      <strong className={`text-black ${langDetection === "en" ? 'mr-1':'ml-1'} text-[15px]`}>
                        {t('collected')}
                      </strong>{" "}
                      {details?.collected_value}
                      <img width={15} src={SR} alt="ryal" className={langDetection === "en" ? 'ml-1':'mr-1'} />
                    </p>
                    <p className="w-fit flex items-center text-sm font-bold text-[#7e7e7e]">
                      <strong className={`text-black ${langDetection === "en" ? 'mr-1':'ml-1'} text-[15px]`}>
                        {t('target')}
                      </strong>{" "}
                      {details?.target_value}
                      <img width={15} src={SR} alt="ryal" className={langDetection === "en" ? 'ml-1':'mr-1'} />
                    </p>
                  </div>
                  <div className="w-[90%] mx-auto flex flex-col gap-5">
                    <h3 className="text-lg text-secondryColor font-bold duration-300">
                      {details?.title}
                    </h3>
                    <div dir="rtl" className="w-full flex">
                      <div className="w-full flex flex-col gap-2">
                        <ul className="w-full flex justify-between">
                          <li className="w-fit text-sm  text-[#7e7e7e]">
                            {t('price')}
                          </li>
                          <li className="w-fit text-sm text-[#7e7e7e]">
                            {t('quantity')}
                          </li>
                        </ul>
                        <div className="flex items-center gap-2">
                          {details?.price_value === "fixed" ? (
                            <input
                              disabled
                              value={price}
                              type="text"
                              className="flex-1 p-1 text-center outline-none bg-[#e9ecef]"
                            />
                          ) : details?.price_value === "multi" ? (
                            <ul className="flex-1 flex justify-center gap-2 p-1 text-center outline-none bg-[#e9ecef]">
                              {details?.multiple_service_values?.map(
                                (value, index) => (
                                  <li
                                    onClick={(e) => {
                                      setPrice(e.target.innerText);
                                      setSelectedIndex(index);
                                    }}
                                    key={value}
                                    className={`w-full px-1 rounded-sm border-secondryColor ${
                                      selectedIndex === index
                                        ? "w-full bg-[#C6ABCE] text-mainColor shrink"
                                        : "bg-mainColor text-white flex-1"
                                    } cursor-pointer font-semibold`}
                                  >
                                    {value}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : details?.price_value === "variable" ? (
                            <input
                              value={price}
                              type="text"
                              className="flex-1 p-1 text-center outline-none bg-[#e9ecef] ml-2 rounded-r-md"
                              onChange={(e) => setPrice(e.target.value)}
                              onFocus={() => setPrice("")}
                            />
                          ) : null}
                          <FontAwesomeIcon
                            className={`text-base p-2 bg-mainColor rounded-br-md rounded-tr-md cursor-pointer text-white hover:bg-secondryColor duration-300`}
                            icon={faMinus}
                            onClick={() => {
                              if (qty > 1) {
                                setQty(qty - 1);
                              }
                            }}
                          />
                          <input
                            value={qty}
                            type="number"
                            className="w-[20%] p-1 text-center outline-none"
                            onChange={(e) => setQty(e.target.value)}
                            onFocus={() => setQty("")}
                          />
                          <FontAwesomeIcon
                            className="text-base p-2 bg-mainColor rounded-bl-md rounded-tl-md cursor-pointer text-white hover:bg-secondryColor duration-300"
                            icon={faPlus}
                            onClick={() => setQty(qty + 1)}
                          />
                        </div>
                        <div className="flex items-center gap-2 w-fit mr-auto">
                          <button
                            onClick={giftNow}
                            className="w-fit mt-5 py-3 px-6 rounded-tr-full rounded-br-full bg-mainColor text-white text-lg font-bold"
                          >
                            {t('gift')}
                          </button>
                          <button
                            onClick={donateNow}
                            className="w-fit mt-5 py-3 px-6 rounded-tl-full rounded-bl-full bg-mainColor text-white text-lg font-bold"
                          >
                            {t('donate now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DonateNowPopup
            donationDetails={donationDetails}
            showDonatePopUp={showDonatePopUp}
            setShowDonatePopUp={setShowDonatePopUp}
            multiPrice={multiPrice}
            qty={qty}
            totalAmount={multiPrice * qty}
          />
          <GiftPopup
            giftDetails={giftDetails}
            showGiftPopUp={showGiftPopUp}
            setShowGiftPopUp={setShowGiftPopUp}
            multiPrice={multiPrice}
            totalAmount={multiPrice * qty}
          />
          <Login showLogin={showLogin} setShowLogin={setShowLogin} />
        </>
      )}
    </ScrollToTop>
  );
};

export default ServiceDetails;
