import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";

const EventCard = ({ event, getEventId, langDetection }) => {
  return (
    <div className="w-[570px] grow flex items-center gap-16 p-10 bg-white rounded-xl shadow-md">
      <div className="size-[130px] shrink-0 max-lg:hidden rounded-full bg-mainColor relative">
        <img src={event?.img} className="size-full object-cover rounded-full" />
        <div className="size-[50px] absolute p-1 left-[-25px] top-1/2 translate-y-[-50%] text-xs text-center font-bold bg-mainColor text-white flex items-center justify-center rounded-full">
          {event?.date}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          to={`/events/details/${event?.id}`}
          className="text-xl text-secondryColor hover:text-mainColor duration-500 font-bold"
        >
          {event?.title}
        </Link>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon className="text-xl text-mainColor" icon={faClock} />
          <strong className="text-secondryColor text-base font-medium">
            الوقت:
          </strong>
          <p className="text-[#7e7e7e] text-base font-medium">{event?.time}</p>
        </div>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            className="text-xl text-mainColor"
            icon={faLocationDot}
          />
          <strong className="text-secondryColor text-base font-medium">
            الموقع:
          </strong>
          <p className="text-[#7e7e7e] text-base font-medium">
            {event?.location}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={`/events/details/${event?.id}`}
            className="w-fit mt-5 py-3 px-6 rounded-tl-full rounded-bl-full bg-mainColor hover:bg-secondryColor duration-300 text-white text-lg font-bold"
          >
            {t("more")}
          </Link>
          {event?.facility_type !== null && (
            <button
              onClick={() => getEventId(event?.id)}
              className={`w-fit mt-5 py-3 px-6 ${
                langDetection === "en" ? "rounded-r-full" : "rounded-l-full"
              } bg-mainColor hover:bg-secondryColor duration-300 text-white text-lg font-bold`}
            >
              {t("book the event")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
