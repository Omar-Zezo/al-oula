import { useEffect, useRef, useState } from "react";
import { FamilyBlur, HappyFamily } from "../../images/imgs";
import ProgramDetailsCard from "../Cards/ProgramDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { getProgramsSections } from "../../store/slices/Home/programsSections";
import { motion } from "framer-motion";
import ProgramsSlider from "./ProgramsSlider";

const ProgramsCards = ({ langDetection }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cardsList, setCardsList] = useState(null);
  const [programDetails, setProgramDetails] = useState(null);

  const { data } = useSelector((state) => state.programsSections);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProgramsSections("limit=5&sort_by=order"));
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
      transition={{ duration: 2 }}
      className="xl:mt-[120px] mt-20 bg-cover relative overflow-hidden"
    >
      <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
        {cardsList?.programs_overview?.title}
      </h2>
      <div className="xl:px-10 px-5 flex max-xl:pb-5 items-end gap-3 relative max-xl:pt-10 mt-20 max-xl:mt-10">
        <img
          src={FamilyBlur}
          alt="blur"
          className={`w-full absolute top-0 max-xl:top-5 ${
            langDetection === "en" ? "left-10" : "right-10"
          } max-xl:hidden`}
        />
        <div className="w-full">
        <ProgramsSlider cardsList={cardsList} setProgramDetails={setProgramDetails} setShowDetails={setShowDetails}/>
        </div>
        <ProgramDetailsCard
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          programDetails={programDetails}
        />
      </div>
    </motion.div>
  );
};

export default ProgramsCards;
