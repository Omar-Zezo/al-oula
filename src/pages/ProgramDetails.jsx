import { useEffect, useState } from "react";
import {
  AboutCover,
  TypeFile,
  TypeImg,
  TypePdf,
  TypeVideo,
} from "../images/imgs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgramDetails } from "../store/slices/Home/programDetails";
import parse from "html-react-parser";
import ProgramInitiativeCard from "../components/Cards/ProgramInitiativeCard";
import ScrollToTop from "../utils/ScrollToTop";
import UseSettings from "../hooks/UseSettings";
import PageLoader from "../utils/PageLoader";
import { Helmet } from "react-helmet";
import UseLangDetection from "../hooks/UseLangDetection";
import { t } from "i18next";

const ProgramDetails = () => {
  const [pageContent, setPageContent] = useState(null);
  const { data } = useSelector((state) => state.programDetails);
  const { id } = useParams();

  const dispatch = useDispatch();
  const settings = UseSettings();
  const langDetection = UseLangDetection();

  useEffect(() => {
    if (id) {
      dispatch(getProgramDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.program) {
            setPageContent(data.data.data.program);
          }
        }
      }
    }
  }, [data]);

  return (
    <ScrollToTop>
      <Helmet>
        <title>{`${settings?.name} - ${t("program Details")}`}</title>
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
              {t("program Details")} {pageContent?.title}
            </p>
          </div>

          {pageContent?.content ? (
            <div
              className={`container bg-white shadow-xl rounded-2xl p-10 border-t-[15px] border-mainColor flex max-xl:flex-col max-xl:gap-5 justify-between items-center mt-[100px]`}
            >
              <div
                className={`w-full flex-1 max-xl:w-full max-xl:order-2 ${
                  pageContent?.image_path
                    ? "block"
                    : "flex flex-1 justify-center"
                } text-xl text-mainColor leading-9 font-medium`}
              >
                {pageContent ? parse(pageContent?.content) : null}
              </div>
            </div>
          ) : null}

          {pageContent?.initiatives?.length > 0 ? (
            <div className="mt-[150px] flex flex-col items-center gap-20">
              <h2 className="text-4xl text-mainColor font-semibold">
                {t('program initiatives')}
              </h2>
              <div className="container flex flex-wrap gap-6">
                {pageContent?.initiatives?.map((initiative) => (
                  <ProgramInitiativeCard
                    key={initiative?.id}
                    initiative={initiative}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {pageContent?.files?.length > 0 ? (
            <div className="mt-[150px] flex flex-col items-center gap-20">
              <h2 className="text-4xl text-mainColor font-semibold">
              {t('program files')}
              </h2>
              <div className="container flex flex-wrap gap-6">
                {pageContent?.files?.map((file) => (
                  <div className="w-[415px] flex flex-col items-center h-[520px] border-b-[6px] border-mainColor shadow-xl rounded-xl">
                    <a href={file?.file_path} target="_blank" download>
                      <img
                        src={
                          file?.type === "image"
                            ? TypeImg
                            : file?.type === "pdf"
                            ? TypePdf
                            : file?.type === "video"
                            ? TypeVideo
                            : TypeFile
                        }
                        alt=""
                        className="w-full h-[400px] object-cover rounded-t-xl"
                      />
                    </a>
                    <a
                      href={file?.file_path}
                      target="_blank"
                      download
                      className="w-[90%] h-[120px] flex items-center justify-center bg-white text-center text-lg text-[#444] hover:text-mainColor duration-300 font-semibold"
                    >
                      {file?.display_name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </ScrollToTop>
  );
};

export default ProgramDetails;
