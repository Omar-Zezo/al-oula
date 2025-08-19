import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";

const ProgramDetailsCard = ({
  showDetails,
  setShowDetails,
  programDetails,
}) => {
  return (
    <div
      className={`size-full bg-[#C6ABCE] absolute z-50 max-xl:fixed max-xl:left-0 max-xl:right-0 ${
        showDetails ? "xl:left-0" : "xl:left-[-100%] hidden"
      } top-0 duration-300`}
    >
      <div className="container max-xl:h-full max-xl:flex-col max-xl:items-center flex justify-between  border-mainColor rounded-lg p-5">
      <div className="w-[15%] max-xl:hidden flex flex-col gap-2">
          <img src={programDetails?.image_path} alt="" className="size-full" />
          <button
            onClick={() => setShowDetails(false)}
            className="text-base flex items-center hover:translate-x-[-8px] duration-300 justify-center gap-2 font-bold text-mainColor shadow-lg px-10 py-3 bg-white rounded-lg"
          >
            <p className="order-2">{t('back')}</p>
            <FontAwesomeIcon
              className="text-xl order-1 text-mainColor"
              icon={faArrowLeft}
            />
          </button>
        </div>
        <div className="xl:w-[80%]">
          <h4 className="text-3xl text-white mb-10 font-semibold">
            {programDetails?.title}
          </h4>
          <div className="w-full h-[400px] overflow-y-auto text-mainColor bg-white rounded-lg p-5">
            {programDetails ? parse(programDetails?.content) : null}
            <div className="flex flex-col">
              <Link
                to={`/program-details/${programDetails?.id}`}
                onClick={() => setShowDetails(false)}
                className="w-fit block mx-auto hover:translate-x-[8px] duration-300 text-base font-bold text-white xl:my-10 my-5 px-10 py-3 bg-mainColor shadow-lg rounded-lg"
              >
                {t('details')}
              </Link>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(false)}
          className="w-fit mx-auto mb-5 xl:hidden flex items-center justify-center gap-2 text-base font-bold text-white px-10 py-3 bg-mainColor rounded-lg"
        >
          <p className="order-2">{t('back')}</p>
          <FontAwesomeIcon className="text-xl order-1 text-white" icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
};

export default ProgramDetailsCard;
