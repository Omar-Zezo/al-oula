import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getFaqList } from "../../store/slices/about us/faqList";
import { t } from "i18next";

const Faq = ({ fqList }) => {
  const [questionId, setQuestionId] = useState(0);
  const [faqList, setFaqList] = useState(null);
  const { data } = useSelector((state) => state.faqList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaqList());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.data) {
            setFaqList(data.data.data.data);
          }
        }
      }
    }
  }, [data]);
  return (
    <div className="container flex gap-20 flex-col overflow-hidden max-xl:mt-20">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t('frequently asked questions')}
        </h2>
      </div>
      <div className="w-full flex flex-col gap-8">
        <ul className="w-full flex max-xl:flex-col gap-5 flex-wrap justify-between">
          {faqList?.map((item, index) => (
            <li className="w-[47%] max-xl:w-full" key={item?.id}>
              <button
                className={`w-full px-5 relative z-10 font-medium cursor-pointer flex items-center bg-mainColor rounded-2xl ${
                  questionId === index &&
                  "after:rounded-br-none after:rounded-bl-none"
                }`}
              >
                <h4
                  className={`text-xl font-bold w-full py-6 text-right ${
                    questionId === index ? "text-orange-200" : "text-white"
                  }`}
                  onClick={() => setQuestionId(index)}
                >
                  {item?.question}
                </h4>
                {questionId === index ? (
                  <span className="text-2xl relative flex justify-center items-center font-bold text-white size-10 z-[-1] after:gradientColorsBg after:rounded-md after:opacity-100">
                    &#8722;
                  </span>
                ) : (
                  <span
                    className="text-2xl relative flex justify-center items-center font-bold text-white size-10 z-[-1] after:gradientColorsBg after:rounded-md after:opacity-20"
                    onClick={() => setQuestionId(5)}
                  >
                    &#43;
                  </span>
                )}
              </button>
              <div
                className={`relative after:gradientColorsBg after:opacity-5 py-7 px-3 ${
                  questionId === index
                    ? "block after:rounded-tr-none after:rounded-tl-none"
                    : "hidden"
                }`}
              >
                <span>
                  <div className="text-lg leading-8 text-[#7e7e7e]">
                    {faqList ? parse(item?.answer) : null}
                  </div>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faq;
