import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OurPartnerInitiativeSlider from "./OurPrizeSlider";

const OurPartnerInitiative = ({partners}) => {
  return (
    <div className="mt-28 relative bg-mainColor flex flex-col gap-10 mb-[650px]">
      <div className="flex flex-col items-center absolute top-0 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl text-mainColor text-center font-bold">
          المساهمون
        </h2>
      </div>
      <div className="w-full absolute top-[180px]">
      <OurPartnerInitiativeSlider partners={partners}/>
      </div>
    </div>
  );
};

export default OurPartnerInitiative;
