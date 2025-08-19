import React, { useEffect, useState } from "react";
import { AboutCover } from "../../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import UseSettings from "../../hooks/UseSettings";
import { getAllPrograms } from "../../store/slices/about us/allPrograms";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import Pagination from "../../utils/Pagination";
import UseLangDetection from "../../hooks/UseLangDetection";
import { t } from "i18next";

const AllPrograms = () => {
  const [programsList, setProgramsList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const programsData = useSelector((state) => state.allPrograms);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const navigate = useNavigate();

  const handlePageClick = (event) => {
    navigate(`?page=${event.selected + 1}`);
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
      dispatch(getAllPrograms({ str: `page=${page}&paginate=9` }));
    } else {
      dispatch(getAllPrograms({ str: `page=${currentPage}&paginate=9` }));
    }
    window.scrollTo(0, 0);
  }, [page]);

  const dispatch = useDispatch();
  const settings = UseSettings();
  const langDetection = UseLangDetection()


  useEffect(() => {
    if (programsData) {
      if (programsData.data) {
        if (programsData.data.data) {
          if (programsData.data.data.data) {
            if (programsData.data.data.data.programs) {
              if (programsData.data.data.data.programs.meta) {
                if (programsData.data.data.data.programs.meta.total) {
                  setTotal(programsData.data.data.data.programs.meta.total);
                }
              }
              if (programsData.data.data.data.programs.data) {
                setProgramsList(programsData.data.data.data.programs.data);
              }
            }
          }
        }
      }
    }
  }, [programsData]);

  return (
    <ScrollToTop>
      <div>
        <Helmet>
          <title>{`${settings?.name} - ${t("our programs")}`}</title>
          <meta name="description" content={settings?.description} />
          <meta name="keywords" content={settings?.keywords} />
          <link rel="icon" type="image/png" href={settings?.icon}></link>
        </Helmet>
        <div className="h-[400px] bg-mainColor rounded-b-[80px] relative">
          <img
            src={AboutCover}
            alt="about-cover"
            className="size-full absolute left-0 top-0 object-cover rounded-b-[80px]"
          />
          <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 rounded-b-[80px]"></div>
        </div>
        <div
          className={`xl:w-fit w-[90%] xl:px-20 h-[100px] ${
            langDetection === "en" ? "xl:ml-24 mr-auto" : "xl:mr-24"
          } flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] max-xl:rounded-bl-[50px] xl:rounded-br-[50px]`}
        >
          <p className="text-[40px] max-xl:text-3xl text-white font-semibold">
            {t("our programs")}
          </p>
        </div>

        <div className="flex flex-col mt-[120px]">
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon
                className="text-mainColor text-5xl"
                icon={faQuoteRight}
              />
              <h2 className="text-5xl text-mainColor text-center font-bold">
              {t("our programs")}
              </h2>
            </div>

            <div className="mt-20">
              <div className="container">
                <div className="flex justify-center gap-10 flex-wrap">
                  {programsList?.map((program) => (
                    <div
                      key={program?.id}
                      className="w-1/6 max-xl:w-[198px] shrink-0 cursor-pointer relative mb-20"
                    >
                      <Link to={`/program-details/${program?.id}`}>
                        <img
                          src={program?.image_path}
                          alt=""
                          className="size-full object-cover"
                        />
                        <h4 className="w-[90%] absolute left-1/2 translate-x-[-50%] bottom-5 text-2xl text-center text-white font-bold">
                          {program?.title}
                        </h4>
                      </Link>
                    </div>
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  total={total}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default AllPrograms;
