import React, { useEffect, useRef, useState } from "react";
import { FigureAbout } from "../../images/imgs";
import { useDispatch, useSelector } from "react-redux";
import { getBriefHome } from "../../store/slices/Home/briefHome";
import { motion } from "framer-motion";

const AboutusSection = ({ langDetection }) => {
  const [briefContent, setBriefContent] = useState(null);
  const { data } = useSelector((state) => state.briefHome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBriefHome());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setBriefContent(data.data.data);
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
      id="about"
      className="flex flex-col gap-10 xl:mt-[120px]"
    >
      <div className="container">
        <div className="xl:w-1/2 w-full flex flex-col max-xl:items-center gap-8">
          <div className="flex xl:hidden flex-col items-center">
            <img src={FigureAbout} alt="about-img" className="w-[90%]" />
            <h3 className="text-5xl max-xl:text-3xl w-[95%] rounded-3xl xl:py-5 py-3 text-center bg-mainColor text-white font-bold">
              {briefContent?.title}
            </h3>
          </div>
          <h3 className="text-5xl max-xl:hidden text-mainColor font-bold">
            {briefContent?.title}
          </h3>
          <p className="text-xl max-lg:text-lg max-xl:text-center text-secondryColor leading-8 font-medium">
            {briefContent?.brief[0]}
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('./about-bar-new.svg')`,
          backgroundSize: "cover",
        }}
        className={`w-[95%] min-h-[308px] ${
          langDetection === "en" ? "pl-28" : "pr-28"
        } ml-auto max-xl:hidden relative flex rounded-tl-[50px] rounded-bl-3xl px-10 py-16`}
      >
        <p className="w-1/2 text-white text-2xl leading-9 left-10">
          {briefContent?.brief[1]}
        </p>

        <img
          src={FigureAbout}
          alt="about-img"
          className={`absolute ${
            langDetection === "en" ? "right-10" : "left-10"
          } bottom-0`}
        />
      </div>
    </motion.div>
  );
};

export default AboutusSection;
