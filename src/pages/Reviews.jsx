import AddRatingStars from "../utils/AddRatingStars";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { makeServiceReview } from "../store/slices/utils/serviceReview";
import UseSettings from "../hooks/UseSettings";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { ArrowUP } from "../images/svg";
import { t } from "i18next";
import UseLangDetection from "../hooks/UseLangDetection";
import Login from "../utils/Login";

const Reviews = () => {
  const [rating, setRating] = useState(null);
  const [ratingMsg, setRatingMsg] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const errorMsg = (msg) => toast.error(msg);

  const settings = UseSettings();
  const navigate = useNavigate();
  const langDetection = UseLangDetection();

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { id } = useParams();
  const getRating = (value) => {
    setRating(value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      setShowLogin(true);
    } else {
      if (rating) {
        if (ratingMsg) {
          if (ratingMsg.length >= 3) {
            dispatch(
              makeServiceReview({
                id,
                data: {
                  rating: rating,
                  review: ratingMsg,
                },
              })
            );
          } else {
            errorMsg(t("the review message must be 3 characters or more"));
          }
        } else {
          errorMsg(t("please write your evaluation message"));
        }
      } else {
        errorMsg(t("please rate first"));
      }
    }
  };

  return (
    <div className="pt-[3%]">
      <Helmet>
        <title>{`${settings?.name} - ${t("rate the service")}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      <div className="flex flex-col items-center h-fit">
        <p className="text-4xl text-[#444] font-medium">
          {t("thank you for your trust in Al-Awla Association")}
        </p>
        <p className="text-gray-600 text-xl font-medium mt-2">
          {t("please rate the service")}
        </p>

        <form
          className="flex flex-col items-center gap-5 mt-10"
          onSubmit={handelSubmit}
        >
          {rating === null ? (
            <span className="text-[80px]">&#128529;</span>
          ) : rating === 1 ? (
            <span className="text-[80px]">&#128542;</span>
          ) : rating === 2 ? (
            <span className="text-[80px]">&#128530;</span>
          ) : rating === 3 ? (
            <span className="text-[80px]">&#128512;</span>
          ) : rating === 4 ? (
            <span className="text-[80px]">&#128525;</span>
          ) : rating === 5 ? (
            <span className="text-[80px]">&#128526;</span>
          ) : null}
          <AddRatingStars getRating={getRating} />
          <textarea
            value={ratingMsg}
            onChange={(e) => setRatingMsg(e.target.value)}
            placeholder={t("please write your comment")}
            className={`w-[500px] h-[200px] text-[#444] text-lg p-5 ${
              langDetection === "en" ? "text-left" : "text-right"
            } overflow-y-auto resize-none border border-mainColor outline-mainColor rounded-lg`}
          ></textarea>
          <input
            type="submit"
            value={t("send")}
            className="text-lg font-semibold text-white bg-mainColor hover:bg-secondryColor duration-300 py-4 px-8 rounded-r-full cursor-pointer"
          />
        </form>

        <div className="flex items-center gap-5 my-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-mainColor p-3 border border-mainColor rounded-lg"
          >
            <FontAwesomeIcon className="text-2xl" icon={faHouse} />
            <p className="text-xl font-medium">{t("home")}</p>
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white p-3 border bg-mainColor rounded-lg"
          >
            <p className="text-xl font-medium">{t("back")}</p>
            <img
              width={30}
              src={ArrowUP}
              alt="back"
              className="rotate-[-90deg]"
            />
          </button>
        </div>

        {/* <div className="flex items-center gap-2 text-xl font-medium mt-10">
          <p className="text-[#444]">رابط الفاتورة:</p>
          <a
            href="https://albir.sa/donation-invoice/BIR-230293/show"
            target="_blanck"
            className="text-blue-500"
          >
            https://albir.sa/donation-invoice/BIR-230293/show
          </a>
        </div> */}
      </div>
      <ToastContainer />
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        langDetection={langDetection}
      />
    </div>
  );
};

export default Reviews;
