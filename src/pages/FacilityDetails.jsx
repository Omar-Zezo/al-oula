import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { AboutCover } from "../images/imgs";
import ScrollToTop from "../utils/ScrollToTop";
import { SR } from "../images/svg";
import { getFacilitieDetails } from "../store/slices/about us/facilityDetails";
import AppointmentPopup from "../utils/AppointmentPopup";
import { Helmet } from "react-helmet";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import FaciliteSlider from "../components/AboutUs/FaciliteSlider";
import UseLangDetection from "../hooks/UseLangDetection";
import { t } from "i18next";

const FacilityDetails = () => {
  const [facilitieContent, setFacilitieContent] = useState(null);
  const [showHallPopup, setShowHallPopup] = useState(false);
  const facilitieDetailsData = useSelector((state) => state.facilityDetails);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const settings = UseSettings();
  const langDetection = UseLangDetection()


  useEffect(() => {
    if (id) {
      dispatch(getFacilitieDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (facilitieDetailsData) {
      if (facilitieDetailsData.data) {
        if (facilitieDetailsData.data.data) {
          if (facilitieDetailsData.data.data.data) {
            setFacilitieContent(facilitieDetailsData.data.data.data);
          }
        }
      }
    }
  }, [facilitieDetailsData]);

  return (
    <ScrollToTop>
      <Helmet>
        <title>{`${settings?.name} - ${t("facilities details")}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      {!facilitieContent ? (
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
              {t("facilities details")}
            </p>
          </div>

          <div className="pt-20">
            <div className="container flex flex-col gap-4">
              <div className="w-full overflow-hidden h-[300px] rounded-xl relative">
                <FaciliteSlider images={facilitieContent?.images} />
              </div>
              <div dir={langDetection === "en" ? 'ltr':'rtl'} className="flex max-xl:flex-col bg-gray-100 xl:p-5 p-2 rounded-xl">
                <div className="w-[60%] max-xl:w-full flex flex-col gap-4 max-xl:order-2">
                  <h3 className="text-3xl max-xl:text-3xl mt-6 text-secondryColor font-bold">
                    {facilitieContent?.name}
                  </h3>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl text-[#444] font-bold">
                        {t('notes')}
                      </h3>
                      <div className="lg:w-[90%] text-lg text-[#7e7e7e] font-medium">
                        {facilitieContent
                          ? parse(facilitieContent?.description)
                          : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[38%] max-xl:w-full xl:mr-auto flex flex-col gap-8 bg-white p-5 rounded-xl">
                  {facilitieContent?.link_map_address ? (
                    <div className="w-[95%] mx-auto flex flex-col gap-5">
                      <iframe
                        src={facilitieContent?.link_map_address}
                        allowFullScreen=""
                        loading="lazy"
                        title="safarymap"
                        className="size-full grayscale"
                      ></iframe>
                    </div>
                  ) : null}

                  {facilitieContent?.address ? (
                    <div className="w-[95%] mx-auto flex items-center gap-2">
                      <p className="text-lg text-mainColor font-semibold">
                        {t('address')}:
                      </p>
                      <p className="text-base text-[#444] font-semibold">
                        {facilitieContent?.address}
                      </p>
                    </div>
                  ) : null}

                  <div className="w-[95%] mx-auto flex flex-col gap-5">
                    {facilitieContent?.price ? (
                      <div className="text-lg flex items-center font-bold duration-300">
                        <strong className="text-mainColor ml-2">السعر:</strong>
                        <p className="text-2xl text-[#444]">
                          {facilitieContent?.price}
                        </p>
                        <img
                          width={16}
                          src={SR}
                          alt="sr-img"
                          className="mr-2"
                        />
                      </div>
                    ) : null}
                    <div className="w-full flex">
                      <div className="w-full flex flex-col gap-2">
                        <div className="flex items-center gap-2 w-fit mr-auto">
                          <button
                            onClick={() => navigate(-1)}
                            className={`w-fit mt-5 py-3 px-6 ${langDetection === "en" ? 'rounded-l-full ':'rounded-r-full '} bg-mainColor text-white text-lg font-bold`}
                          >
                            {t('back')}
                          </button>
                          <button
                            onClick={() => setShowHallPopup(true)}
                            className={`w-fit mt-5 py-3 px-6 ${langDetection === "en" ? 'rounded-r-full ':'rounded-l-full '} bg-mainColor text-white text-lg font-bold`}
                          >
                            {t('book')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AppointmentPopup
              showHallPopup={showHallPopup}
              setShowHallPopup={setShowHallPopup}
              facility_id={id}
            />
          </div>
        </>
      )}
    </ScrollToTop>
  );
};

export default FacilityDetails;
