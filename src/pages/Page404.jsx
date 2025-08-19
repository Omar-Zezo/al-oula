import React from "react";
import { Page404Img } from "../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUP } from "../images/svg";
import { t } from "i18next";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center pt-[100px] gap-5">
      <p className="w-full text-center text-2xl text-mainColor font-semibold">
        {t('the link is incorrect')}
      </p>
      <img width={500} src={Page404Img} alt="404" className="object-cover" />
      <div className="flex items-center gap-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-mainColor p-3 border border-mainColor rounded-lg"
        >
          <FontAwesomeIcon className="text-2xl" icon={faHouse} />
          <p className="text-xl font-medium">{t('home')}</p>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white p-3 border bg-mainColor rounded-lg"
        >
          <p className="text-xl font-medium">{t('back')}</p>
          <img
            width={30}
            src={ArrowUP}
            alt="back"
            className="rotate-[-90deg]"
          />
        </button>
      </div>
    </div>
  );
};

export default Page404;
