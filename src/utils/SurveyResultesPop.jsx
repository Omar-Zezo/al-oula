import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SurveyResultesPop = ({ showPopUp, setShowPopUp, survey }) => {
  console.log(survey);
  return (
    <div
      onClick={() => setShowPopUp(false)}
      className={`fixed top-0 left-0 z-[999] ${
        showPopUp ? "flex" : "hidden"
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
            onClick={() => setShowPopUp(false)}
          />
        </div>
        <div className="flex flex-col p-5 gap-8 mt-5">
          <h3 className="text-xl font-bold text-secondryColor">
            {survey?.title}
          </h3>
          <ul className="flex flex-col gap-5">
            <li className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-[#7e7e7e]">راضٍ بشدة</p>
              <div className="bg-gray-200 flex items-center rounded-full h-5">
                <div
                  style={{
                    width: `${Math.round(
                      (survey?.very_satisfied /
                        (survey?.angry +
                          survey?.neutral +
                          survey?.not_satisfied +
                          survey?.somewhat_satisfied +
                          survey?.very_satisfied)) *
                        100
                    )}%`,
                  }}
                  className="h-full text-center text-white rounded-full font-semibold bg-green-500"
                >
                  {Math.round(
                    (survey?.very_satisfied /
                      (survey?.angry +
                        survey?.neutral +
                        survey?.not_satisfied +
                        survey?.somewhat_satisfied +
                        survey?.very_satisfied)) *
                      100
                  )}
                  %
                </div>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-[#7e7e7e]">
                راضٍ نوعاً ما
              </p>
              <div className="bg-gray-200 flex items-center rounded-full h-5">
                <div 
                style={{
                    width: `${Math.round(
                      (survey?.somewhat_satisfied /
                        (survey?.angry +
                          survey?.neutral +
                          survey?.not_satisfied +
                          survey?.somewhat_satisfied +
                          survey?.very_satisfied)) *
                        100
                    )}%`,
                  }}
                className="h-full text-center text-white rounded-full font-semibold bg-blue-500">
                  {Math.round(
                    (survey?.somewhat_satisfied /
                      (survey?.angry +
                        survey?.neutral +
                        survey?.not_satisfied +
                        survey?.somewhat_satisfied +
                        survey?.very_satisfied)) *
                      100
                  )}
                  %
                </div>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-[#7e7e7e]">محايد</p>
              <div className="bg-gray-200 flex items-center rounded-full h-5">
                <div 
                style={{
                    width: `${Math.round(
                      (survey?.neutral /
                        (survey?.angry +
                          survey?.neutral +
                          survey?.not_satisfied +
                          survey?.somewhat_satisfied +
                          survey?.very_satisfied)) *
                        100
                    )}%`,
                  }}
                className="h-full text-center text-white rounded-full font-semibold bg-orange-400">
                {Math.round(
                    (survey?.neutral /
                      (survey?.angry +
                        survey?.neutral +
                        survey?.not_satisfied +
                        survey?.somewhat_satisfied +
                        survey?.very_satisfied)) *
                      100
                  )}
                  %
                </div>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-[#7e7e7e]">غير راضٍ</p>
              <div className="bg-gray-200 flex items-center rounded-full h-5">
                <div 
                style={{
                    width: `${Math.round(
                      (survey?.not_satisfied /
                        (survey?.angry +
                          survey?.neutral +
                          survey?.not_satisfied +
                          survey?.somewhat_satisfied +
                          survey?.very_satisfied)) *
                        100
                    )}%`,
                  }}
                className="h-full w-1/2 text-center text-white rounded-full font-semibold bg-yellow-400">
                {Math.round(
                    (survey?.not_satisfied /
                      (survey?.angry +
                        survey?.neutral +
                        survey?.not_satisfied +
                        survey?.somewhat_satisfied +
                        survey?.very_satisfied)) *
                      100
                  )}
                  %
                </div>
              </div>
            </li>

            <li className="flex flex-col gap-2">
              <p className="text-lg font-semibold text-[#7e7e7e]">غاضب</p>
              <div className="bg-gray-200 flex items-center rounded-full h-5">
                <div 
                style={{
                    width: `${Math.round(
                      (survey?.angry /
                        (survey?.angry +
                          survey?.neutral +
                          survey?.not_satisfied +
                          survey?.somewhat_satisfied +
                          survey?.very_satisfied)) *
                        100
                    )}%`,
                  }}
                className="h-full w-1/2 text-center text-white rounded-full font-semibold bg-red-700">
                {Math.round(
                    (survey?.angry /
                      (survey?.angry +
                        survey?.neutral +
                        survey?.not_satisfied +
                        survey?.somewhat_satisfied +
                        survey?.very_satisfied)) *
                      100
                  )}
                  %
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SurveyResultesPop;
