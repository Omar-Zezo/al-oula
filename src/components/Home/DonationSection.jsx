import { useEffect, useRef, useState } from "react";
import { DonationBg } from "../../images/imgs";
import { getDonationSliderHome } from "../../store/slices/Home/donationSliderHome";
import DonationSlider from "./DonationSlider";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const DonationSection = ({
  setShowDonatePopUp,
  setShowGiftPopUp,
  getDonation,
  setShowLogin,
}) => {
  const [slides, setSlides] = useState(null);
  const { data } = useSelector((state) => state.donationSliderHome);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDonationSliderHome());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setSlides(data.data.data);
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
    >
      {slides?.length > 0 ? (
        <div className="mt-[150px] mb-[350px] h-[500px] relative">
          <img
            src={DonationBg}
            alt="bg-donation"
            className="size-full absolute top-[100px] left-0"
          />
          <DonationSlider
            slides={slides}
            setShowDonatePopUp={setShowDonatePopUp}
            setShowLogin={setShowLogin}
            getDonation={getDonation}
            setShowGiftPopUp={setShowGiftPopUp}
          />
        </div>
      ) : null}
    </motion.div>
  );
};

export default DonationSection;
