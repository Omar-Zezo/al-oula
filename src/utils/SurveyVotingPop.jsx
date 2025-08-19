import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { makeVoting } from "../store/slices/about us/voteForSurvey";

const SurveyVotingPop = ({ showPopUpVoting, setShowPopUpvoting, survey }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const { data } = useSelector((state) => state.voteForSurvey);

  const dispatch = useDispatch();

  const successMsg = (msg) => toast.success(msg);
  const errorMsg = (msg) => toast.error(msg);

  useEffect(() => {
    if (data) {
      console.log(data)
      if (data.status === 200) {
        if(data?.data){
          if(data.data.msg){
          successMsg(data.data.msg)
          }
        }
      }
    }
  }, [data]);

  const handlevoting = () => {
    if (selectedValue !== "") {
      dispatch(
        makeVoting({
          data: { vote_status: selectedValue },
          id: survey?.id,
        })
      );
    }else{
        errorMsg("من فضلك قم بالأختيار أولاً")
    }
  };

  return (
    <div
      onClick={() => setShowPopUpvoting(false)}
      className={`fixed top-0 left-0 z-[999] ${
        showPopUpVoting ? "flex" : "hidden"
      } justify-center items-center size-full bg-black/20`}
    >
      <div
        className="bg-white w-full lg:w-[600px] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-5 rounded-t-xl bg-gray-200">
          <p className="text-xl text-secondryColor font-bold">
            عرض نتائج التصويت
          </p>
          <FontAwesomeIcon
            className="text-xl text-zinc-500 cursor-pointer"
            icon={faX}
            onClick={() => setShowPopUpvoting(false)}
          />
        </div>
        <div className="flex flex-col p-5 gap-8 mt-5">
          <h3 className="text-xl font-bold text-secondryColor">
            رضاك عن: {survey?.title}
          </h3>
          <div className="flex flex-col gap-4">
            <label
              className={`w-fit text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-10 py-4 ${
                selectedValue === "very_satisfied"
                  ? "bg-mainColor text-white"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="vote"
                value="very_satisfied"
                checked={selectedValue === "very_satisfied"}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="mr-2 hidden"
              />
              راضٍ بشدة
            </label>

            <label
              className={`w-fit text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-10 py-4 ${
                selectedValue === "somewhat_satisfied"
                  ? "bg-mainColor text-white"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="vote"
                value="somewhat_satisfied"
                checked={selectedValue === "somewhat_satisfied"}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="mr-2 hidden"
              />
              راضٍ نوعاً ما
            </label>

            <label
              className={`w-fit text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-10 py-4 ${
                selectedValue === "neutral" ? "bg-mainColor text-white" : ""
              }`}
            >
              <input
                type="radio"
                name="vote"
                value="neutral"
                checked={selectedValue === "neutral"}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="mr-2 hidden"
              />
              محايد
            </label>

            <label
              className={`w-fit text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-10 py-4 ${
                selectedValue === "not_satisfied"
                  ? "bg-mainColor text-white"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="vote"
                value="not_satisfied"
                checked={selectedValue === "not_satisfied"}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="mr-2 hidden"
              />
              غير راضٍ
            </label>

            <label
              className={`w-fit text-mainColor text-lg font-semibold cursor-pointer border border-mainColor hover:bg-mainColor hover:text-white duration-300 rounded-[50px] px-10 py-4 ${
                selectedValue === "angry" ? "bg-mainColor text-white" : ""
              }`}
            >
              <input
                type="radio"
                name="vote"
                value="angry"
                checked={selectedValue === "angry"}
                onChange={(e) => setSelectedValue(e.target.value)}
                className="mr-2 hidden"
              />
              غاضب
            </label>
          </div>
          <button
            onClick={handlevoting}
            className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white text-lg rounded-[50px] font-semibold"
          >
            تصويت
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyVotingPop;
