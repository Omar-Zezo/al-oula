import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SurveyResultesPop from "../../utils/SurveyResultesPop";
import SurveyVotingPop from "../../utils/SurveyVotingPop";

const SurveyCard = ({survey}) => {
const [showPopUp, setShowPopUp] = useState(false);
const [showPopUpVoting, setShowPopUpvoting] = useState(false);

  return (
    <div className="max-xl:w-full max-xl:flex-col w-[48%] mb-5 shadow-md flex items-center justify-between bg-slate-100 p-5 rounded-lg">
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-2">
          <p className="text-lg text-mainColor font-semibold">الإستبيان: </p>
          <p className="text-lg text-secondryColor font-medium">
            {survey?.title}
          </p>
        </li>

        <li className="flex items-center gap-2">
          <p className="text-lg text-mainColor font-semibold">عدد الأصوات: </p>
          <p className="text-lg text-secondryColor font-medium">{survey?.angry + survey?.neutral + survey?.not_satisfied + survey?.somewhat_satisfied + survey?.very_satisfied}</p>
        </li>
      </ul>
      <div className="w-fit flex xl:flex-col max-xl:mt-5 gap-4">
        <button 
        onClick={()=> setShowPopUp(true)}
        className="text-white text-base px-4 py-2 rounded-md size-fit bg-blue-500 flex items-center font-semibold">
          <FontAwesomeIcon className="text-xl text-white ml-2" icon={faEye} />
         النتائج
        </button>

        <button 
        onClick={()=> setShowPopUpvoting(true)}
        className="text-white text-base px-4 py-2 rounded-md size-fit bg-green-500 flex items-center font-semibold">
          <FontAwesomeIcon
            className="text-xl text-white ml-2"
            icon={faChartSimple}
          />
          تصويت
        </button>
      </div>
      {showPopUp && <SurveyResultesPop survey={survey} showPopUp={showPopUp} setShowPopUp={setShowPopUp}/>}
      {showPopUpVoting && <SurveyVotingPop survey={survey} showPopUpVoting={showPopUpVoting} setShowPopUpvoting={setShowPopUpvoting}/>}
    </div>
  );
};

export default SurveyCard;
