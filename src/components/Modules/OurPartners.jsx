import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OurPartnersSlider from "../AboutUs/OurPartnersSlider";
import { t } from "i18next";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const OurPartners = () => {
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
      className="mt-20 h-[500px] max-xl:h-[450px] xl:hidden relative flex flex-col gap-10 max-xl:gap-5"
    >
      <div className="w-full flex flex-col items-center absolute top-10 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t("success partners")}
        </h2>
      </div>
      <div className="w-full max-xl:px-5 h-[500px] absolute top-[180px]">
        <OurPartnersSlider />
      </div>
    </motion.div>
  );
};

export default OurPartners;
