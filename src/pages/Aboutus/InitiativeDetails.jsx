import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { AboutCover } from "../../images/imgs";
import { getInitiativeDetails } from "../../store/slices/about us/initiativeDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import OurPartnerInitiative from "../../components/AboutUs/OurPartnerInitiative";
import { Helmet } from "react-helmet";
import UseSettings from "../../hooks/UseSettings";
import PageLoader from "../../utils/PageLoader";

const InitiativeDetails = () => {
  const [initiative, setInitiative] = useState(null);
  const { data } = useSelector((state) => state.initiativeDetails);

  const dispatch = useDispatch();
  const { id } = useParams();

  const settings = UseSettings();

  useEffect(() => {
    if (id) {
      dispatch(getInitiativeDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data) {
            if (data.data.data.initiative) {
              setInitiative(data.data.data.initiative);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div>
      <Helmet>
        <title>{`${settings?.name} - تفاصيل المبادرة`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      {!initiative ? (
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
            <div className="xl:w-fit w-[90%] xl:px-20 h-[100px] xl:mr-24 flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]">
              <p className="text-[40px] text-white font-semibold">
                تفاصيل المبادرة
              </p>
            </div>

          <div className="container mt-20">
            <div className="container max-xl:flex-col flex justify-between gap-4">
              <div className="w-[48%] max-xl:w-full max-xl:order-2 flex flex-col gap-3">
                <h3 className="text-3xl mt-6 text-secondryColor font-bold">
                  {initiative?.title}
                </h3>

                <div className="text-lg text-[#7e7e7e] font-medium mt-6">
                  {initiative ? parse(initiative?.content) : null}
                </div>
                {initiative?.accept_join ? (
                  <Link
                    to={`/pages/join_as_a_partner?initiative_id=${initiative?.id}`}
                    className="w-fit mt-10 bg-mainColor hover:bg-green-600 text-lg text-white px-5 py-4 rounded-xl font-semibold hover:translate-x-1 duration-300"
                  >
                    إنضم كشريك للمبادرة
                  </Link>
                ) : null}
              </div>
              <div className="w-1/2 max-xl:w-full max-xl:order-1 h-[250px] xl:h-[500px] rounded-xl">
                <img
                  src={initiative?.image_path}
                  alt="project-img"
                  className="size-full object-cover rounded-xl"
                />
              </div>
            </div>
            {initiative?.service ? (
              <div className="flex flex-col gap-5 mt-24">
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon
                    className="text-mainColor text-5xl"
                    icon={faQuoteRight}
                  />
                  <h2 className="text-[40px] text-mainColor text-center font-bold">
                    خدمات المبادرة
                  </h2>
                </div>
                <div className="w-fit flex mx-auto bg-white border border-black/10 p-5 rounded-2xl  mt-10">
                  <div className="w-[300px] flex flex-col items-center gap-3 h-[400px] border border-black/20 rounded-xl">
                    <img
                      src={initiative?.service?.image_path}
                      alt=""
                      className="w-full h-[280px] object-cover rounded-t-2xl"
                    />
                    <div className="w-full flex flex-col items-center gap-4">
                      <h3 className="w-[90%] text-center text-xl text-[#444] font-semibold">
                        {initiative?.service?.title}
                      </h3>
                      <Link
                        to={`/services-sections/service/${initiative?.service?.id}`}
                        className="w-fit mx-auto text-lg text-white bg-mainColor hover:bg-green-600 rounded-lg py-2 px-5 hover:translate-x-1 duration-300"
                      >
                        تبرع الأن
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {initiative?.partners?.length > 0 ? (
            <OurPartnerInitiative partners={initiative?.partners} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default InitiativeDetails;
