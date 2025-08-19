import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OurPrizeSlider from "./OurPrizeSlider";
import { t } from "i18next";

const OurPrizes = () => {
 

  return (
    <div
      className="mt-[180px] relative bg-mainColor flex flex-col gap-10 mb-[650px]"
    >
      <div className="flex flex-col items-center absolute top-10 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t("our awards")}
        </h2>
      </div>
      <div className="w-full absolute top-[180px]">
        <OurPrizeSlider />
      </div>
    </div>
  );
};

export default OurPrizes;
