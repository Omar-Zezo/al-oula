import React, { useEffect, useRef, useState } from "react";
import { StatisticsSection } from "../../images/svg";
import NumCard from "../Cards/NumCard";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../../store/slices/Home/statistics";
import { motion } from "framer-motion";

const Statistics = () => {
  const [cardsList, setCardsList] = useState(null);
  const { data } = useSelector((state) => state.statistics);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setCardsList(data.data.data);
        }
      }
    }
  }, [data]);

  //motion
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="w-full xl:h-[300px]  max-md:h-[450px] h-[650px] pb-5 mt-20 xl:relative overflow-x-auto overflow-y-hidden"
    >
      <img
        height={420}
        src={StatisticsSection}
        alt="bg"
        className="size-full absolute top-0 left-0 object-cover max-xl:hidden"
      />
      <div className="w-full xl:h-full flex max-xl:justify-center max-xl:flex-wrap gap-3 items-center absolute left-1/2 translate-x-[-50%] z-100">
        {cardsList?.map((item, index) => (
          <NumCard key={index} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Statistics;
