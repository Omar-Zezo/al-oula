import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { getNewsDetails } from "../store/slices/media cnter/newsDetails";
import { AboutCover } from "../images/imgs";
import ScrollToTop from "../utils/ScrollToTop";
import { Helmet } from "react-helmet";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import UseLangDetection from "../hooks/UseLangDetection";
import { t } from "i18next";

const NewsDetails = () => {
  const [details, setDetails] = useState(null);
  const { data } = useSelector((state) => state.newsDetails);

  const dispatch = useDispatch();
  const { id } = useParams();
  const settings = UseSettings();
  const langDetection = UseLangDetection()


  useEffect(() => {
    if (id) {
      dispatch(getNewsDetails(id));
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
        <title>{`${settings?.name} - ${t('news details')}`}</title>
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
              {t("news details")}
            </p>
          </div>

          <div 
          dir={langDetection === "en" ? 'ltr':'rtl'}
          className="pt-20 container">
            <div className="container flex flex-col gap-4">
              <div className="w-full h-[300px] rounded-xl">
                <img
                  src={details?.image_path}
                  alt="project-img"
                  className="size-full object-cover rounded-xl"
                />
              </div>
              <h3 className="text-[36px] max-xl:text-3xl max-xl:leading-10 mt-6 text-secondryColor font-bold">
                {details?.title}
              </h3>
              <div 
              dir={langDetection === "en" ? 'ltr':'rtl'}
              className="text-lg text-[#7e7e7e] font-medium mt-6">
                {details ? parse(details?.content) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </ScrollToTop>
  );
};

export default NewsDetails;
