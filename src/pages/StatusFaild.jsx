import { faHouse, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUP, Logo } from "../images/svg";
import { t } from "i18next";

const StatusFaild = () => {
  const paymentStatus = JSON.parse(localStorage.getItem("paymentStatus"));

  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col items-center gap-20 justify-center">
       <div className="flex gap-4 items-center">
          <Link to={"/"}>
          <img width={100} src={Logo} alt="logo"/>
          </Link>
          <h1 className="text-3xl text-mainColor font-semibold">{t('oula Association')}</h1>
        </div>
      <div className="h-fit flex flex-col items-center gap-5">
        <div className="size-[100px] flex justify-center items-center bg-red-700 rounded-full">
          <FontAwesomeIcon className="text-5xl text-white" icon={faXmark} />
        </div>
        <p className="text-secondryColor text-lg font-semibold">
          {paymentStatus.msg}
        </p>
        <p className="text-secondryColor text-lg font-semibold">
          {paymentStatus?.error?.msg_code}
        </p>
      </div>

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

export default StatusFaild;
