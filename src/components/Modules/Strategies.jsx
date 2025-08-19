import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getStrategies } from "../../store/slices/about us/strategies";
import { useEffect, useState } from "react";
import { t } from "i18next";

const Strategies = () => {
    const [strategy, setStrategy] = useState(null);
  const { data } = useSelector((state) => state.strategies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStrategies());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
            setStrategy(data.data.data);
        }
      }
    }
  }, [data]);
  return (
    <div className="relative container mt-[100px]">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t('strategic plan')}
        </h2>
      </div>

      <div className="w-[80%] max-xl:w-full h-[400px] xl:h-[550px] mx-auto bg-mainColor mt-10 rounded-2xl p-5 pb-10 relative overflow-hidden strategies">
        <div className="size-full border-t-[10px] border-white overflow-hidden rounded-t-xl">
            <img src={strategy} alt="strategy" className="size-full object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default Strategies;
