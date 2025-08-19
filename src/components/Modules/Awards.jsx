import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OurPrizeSlider from "../Home/OurPrizeSlider";
import { t } from "i18next";

const Awards = () => {
  return (
    <div className="mt-[100px] relative flex flex-col gap-10 mb-[400px]">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl text-mainColor text-center font-bold">
          {t('our awards')}
        </h2>
      </div>
      <div className="w-full absolute top-[180px]">
      <OurPrizeSlider/>
      </div>
    </div>
  );
};

export default Awards;
