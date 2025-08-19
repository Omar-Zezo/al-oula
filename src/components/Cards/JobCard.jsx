import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";

const JobCard = ({ job, index, selectedIndex }) => {
  return (
    <div className="flex flex-col it">
      <div className="flex items-center justify-between p-5 rounded-t-md bg-gray-200 cursor-pointer">
        <h3 className="text-lg text-mainColor font-bold">{job?.title}</h3>
        <FontAwesomeIcon
          className="text-2xl text-mainColor"
          icon={index === selectedIndex ? faAngleUp :faAngleDown}
        />
      </div>
      <div
        className={`py-5 text-lg px-5 ${
          index === selectedIndex ? "flex" : "hidden"
        } flex-col border border-t-0 border-black/20 rounded-b-md gap-4 text-[#7e7e7e]`}
      >
        {job ? parse(job?.content) : null}
      </div>
    </div>
  );
};

export default JobCard;
