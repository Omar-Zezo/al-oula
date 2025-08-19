import {
  faCalendarDays,
  faEye,
  faHandHoldingDollar,
  faMoneyBillWave,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SR } from "../../images/svg";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const DonationRecordCard = ({ item }) => {
  const langDetection = UseLangDetection()
  return (
    <div className="w-[48%] max-xl:w-full mb-5 shadow-sm border border-black/30 p-5 hover:border-mainColor duration-300 rounded-lg">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center bg-secondryColor rounded-full">
            <FontAwesomeIcon
              className="text-base text-white"
              icon={faHandHoldingDollar}
            />
          </div>
          <p className="text-lg text-secondryColor font-semibold">
          {t('donation code')}:
          </p>
          <p className="text-lg text-mainColor font-semibold">
            {item?.donation_code} [{item?.donation_type}]
          </p>
          <div className={`rounded-full ${langDetection === "en" ? 'ml-auto':'mr-auto'} text-lg bg-mainColor text-white hover:bg-secondryColor duration-300`}>
            <a
              href={item?.invoice}
              target="_blanck"
              className="size-10 flex items-center justify-center"
            >
              <FontAwesomeIcon className="text-lg" icon={faEye} />
            </a>
          </div>
        </li>

        <li className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center bg-secondryColor rounded-full">
            <FontAwesomeIcon
              className="text-base text-white"
              icon={faCalendarDays}
            />
          </div>
          <p className="text-lg text-secondryColor font-semibold">
            {t('donation date')}:
          </p>
          <p className="text-lg text-mainColor font-semibold">
            {item?.created_at}
          </p>
        </li>

        <li className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center bg-secondryColor rounded-full">
            <FontAwesomeIcon className="text-base text-white" icon={faWallet} />
          </div>
          <p className="text-lg text-secondryColor font-semibold">
            {t('donation amount')}:
          </p>
          <p className="text-lg flex gap-2 items-center text-mainColor font-semibold">
            {item?.total_amount}
            <img width={15} src={SR} alt="ryal" />
          </p>
          {item?.donation_status === "paid" ? (
            <div className={`group  size-8 ${langDetection === "en" ? 'ml-auto':'mr-auto'} bg-green-600 text-white flex items-center justify-center rounded-full`}>
              <FontAwesomeIcon className="text-base" icon={faMoneyBillWave} />
              <span className="group-hover:block text-white font-medium hidden text-center text-[8px] bg-[#444] absolute top-[-21px] left-1/2 w-[45px] p-1">
                {t('paid')}
              </span>
            </div>
          ) : (
            <div className={`tool-parent size-8 ${langDetection === "en" ? 'ml-auto':'mr-auto'} relative bg-red-600 text-white flex items-center justify-center rounded-full`}>
              <FontAwesomeIcon className="text-base" icon={faMoneyBillWave} />
              <span className="text-white font-medium hidden text-center text-[8px] bg-[#444] absolute top-[-21px] left-1/2 w-[45px] p-1">
              {t('unpaid')}
              </span>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default DonationRecordCard;
