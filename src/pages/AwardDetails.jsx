import { useEffect, useState } from "react";
import { AboutCover } from "../images/imgs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import ScrollToTop from "../utils/ScrollToTop";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import { Helmet } from "react-helmet";
import UseLangDetection from "../hooks/UseLangDetection";
import { t } from "i18next";
import { getAwardDetails } from "../store/slices/about us/awardDetails";

const AwardDetails = () => {
  const [pageContent, setPageContent] = useState(null);
  const { data } = useSelector((state) => state.awardDetails);
  const { slug } = useParams();

  const dispatch = useDispatch();
  const settings = UseSettings();
  const langDetection = UseLangDetection();

  useEffect(() => {
    if (slug) {
      dispatch(getAwardDetails(slug));
    }
  }, [slug]);

  useEffect(() => {
    if (data?.data?.data?.award) {
      setPageContent(data?.data?.data?.award);
    }
  }, [data]);

  return (
    <ScrollToTop>
      <Helmet>
        <title>{`${settings?.name} - ${t("award details")}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      {!pageContent ? (
        <PageLoader />
      ) : (
        <div className="flex flex-col">
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
              {t("award details")}
            </p>
          </div>

          <div
            className={`container p-10 flex flex-col max-xl:flex-col gap-8 items-center mt-[100px]`}
          >
            <div className="size-[300px] flex justify-center items-center bg-white shadow-xl rounded-tr-[50px] rounded-bl-[50px] border-y-[8px] border-y-mainColor">
              <img
                src={pageContent?.image_path}
                alt={pageContent?.title}
                className="w-[200px]"
              />
            </div>
            <h1 className="text-[36px] mx-auto mb-8 max-xl:text-3xl max-xl:leading-10 font-semibold text-mainColor text-center">
              {pageContent?.title}
            </h1>
            <div 
            dir={langDetection === "en" ? 'ltr':'rtl'}
            className="text-lg text-[#7e7e7e] font-medium">{pageContent ? parse(pageContent?.content) : null}</div>
          </div>
        </div>
      )}
    </ScrollToTop>
  );
};

export default AwardDetails;
