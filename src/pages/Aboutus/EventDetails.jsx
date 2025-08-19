import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { getEventDetails } from "../../store/slices/about us/eventDetails";
import { AboutCover } from "../../images/imgs";
import { Helmet } from "react-helmet";
import UseSettings from "../../hooks/UseSettings";
import PageLoader from "../../utils/PageLoader";
import ScrollToTop from "../../utils/ScrollToTop";
import AppointmentPopup from "../../utils/AppointmentPopup";
import UseLangDetection from "../../hooks/UseLangDetection";
import { t } from "i18next";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [showHallPopup, setShowHallPopup] = useState(false);
  const { data } = useSelector((state) => state.eventDetails);

  const dispatch = useDispatch();
  const { id } = useParams();

  const settings = UseSettings();
  const langDetection = UseLangDetection()


  useEffect(() => {
    if (id) {
      dispatch(getEventDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data) {
            if (data.data.data.event) {
              setEvent(data.data.data.event);
              console.log(data.data.data.event);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <ScrollToTop>
      <div>
        <Helmet>
          <title>{`${settings?.name} - ${t("event Details")}`}</title>
          <meta name="description" content={settings?.description} />
          <meta name="keywords" content={settings?.keywords} />
          <link rel="icon" type="image/png" href={settings?.icon}></link>
        </Helmet>

        {!event ? (
          <PageLoader />
        ) : (
          <div>
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
                {t("event Details")}
              </p>
            </div>

            <div dir={langDetection === "en" ? 'ltr':'rtl'} className="container mt-20">
              <div className="container max-xl:flex-col flex justify-between gap-4">
                <div className="w-[48%] max-xl:w-full max-xl:order-2 flex flex-col gap-3">
                  <h3 className="text-3xl mt-6 text-secondryColor font-bold">
                    {event?.title}
                  </h3>

                  <div className="text-lg text-[#7e7e7e] font-medium mt-6">
                    {event ? parse(event?.content) : null}
                  </div>
                  {event?.facility_type !== null && (
                    <button
                      onClick={() => setShowHallPopup(true)}
                      className="p-3 bg-mainColor hover:bg-secondryColor duration-300 text-white text-lg font-semibold rounded-lg"
                    >
                      {t('book the event')}
                    </button>
                  )}
                </div>
                <div className="w-1/2 max-xl:w-full max-xl:order-1 h-[250px] xl:h-[500px] rounded-xl">
                  <img
                    src={event?.img}
                    alt="project-img"
                    className="size-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="bg-green-700 flex flex-col gap-4 justify-center items-center rounded-xl mt-20 py-10 px-5">
                <p className="text-white text-2xl font-medium">
                  {event?.location}
                </p>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white text-lg font-medium">
                    {t('date')}: {event?.date}
                  </p>
                  <p className="text-white text-lg font-medium">
                  {t('time')}: {event?.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AppointmentPopup
        showHallPopup={showHallPopup}
        setShowHallPopup={setShowHallPopup}
        facility_id={false}
        event_id={event?.id}
        langDetection={langDetection}
      />
    </ScrollToTop>
  );
};

export default EventDetails;
