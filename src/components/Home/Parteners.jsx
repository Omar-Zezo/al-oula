import {
  faArrowLeft,
  faArrowRight,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersHome } from "../../store/slices/Home/partnersHome";
import { t } from "i18next";
import { motion } from "framer-motion";

const Parteners = ({ langDetection }) => {
  const [partnersList, setPartnersList] = useState([]);
  const { data } = useSelector((state) => state.partnersHome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnersHome());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setPartnersList(data.data.data);
        } else {
          setPartnersList([]);
        }
      }
    }
  }, [data]);

  // to generate 4 random items
  const getRandomPartners = () => {
    if (!Array.isArray(partnersList) || partnersList.length === 0) {
      return []; // تجنب الأخطاء بإرجاع مصفوفة فارغة
    }

    let availablePartners = [...partnersList]; // copy the main array
    let randomSelection = [];

    while (randomSelection.length < 4 && availablePartners.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePartners.length);
      randomSelection.push(availablePartners[randomIndex]);
      availablePartners.splice(randomIndex, 1); // remove duplicate item
    }

    return randomSelection;
  };

  // status for partners list
  const [selectedPartners, setSelectedPartners] = useState(getRandomPartners());
  const [selectedPartner, setSelectedPartner] = useState(selectedPartners[0]);

  useEffect(() => {
    if (partnersList.length > 0) {
      const newRandomPartners = getRandomPartners();
      setSelectedPartners(newRandomPartners);
      setSelectedPartner(newRandomPartners[0] || null);
    }
  }, [partnersList]);

  const updatePartners = () => {
    const newRandomPartners = getRandomPartners();
    setSelectedPartners(newRandomPartners);
    setSelectedPartner(newRandomPartners[0]); // make the first item the main item
  };

  useEffect(() => {
    if (partnersList.length > 0) {
      const interval = setInterval(() => {
        updatePartners();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [partnersList]);

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
      className="container mt-[200px] mb-[250px] max-xl:hidden"
    >
      <div className="flex items-center justify-between">
        <div className="w-[30%] flex flex-col gap-4">
          <FontAwesomeIcon
            className={`text-mainColor text-5xl ${
              langDetection === "en" ? "mr-auto" : "ml-auto"
            }`}
            icon={faQuoteRight}
          />
          <h2
            className={`text-[50px] text-mainColor font-semibold ${
              langDetection === "en" ? "text-left" : "text-right"
            }`}
          >
            {t("partners")}
            <br />
            {t("success and Development")}
          </h2>
          <div className="flex gap-10 justify-center">
            <FontAwesomeIcon
              className={`text-5xl text-mainColor cursor-pointer hover:translate-x-1 duration-300 ${
                langDetection === "en" ? "order-2" : "order-1"
              }`}
              icon={faArrowRight}
              onClick={updatePartners}
            />
            <FontAwesomeIcon
              className={`text-5xl text-mainColor cursor-pointer hover:translate-x-[-4px] duration-300 ${
                langDetection === "en" ? "order-1" : "order-2"
              }`}
              icon={faArrowLeft}
              onClick={updatePartners}
            />
          </div>
        </div>
        <div className="w-[68%] flex items-center">
          <div className="flex flex-wrap gap-5">
            {selectedPartners?.map((partner) => (
              <div
                onClick={() => setSelectedPartner(partner)}
                key={partner?.id}
              >
                <a href={partner?.url} target="_blanck" className="size-[250px] flex justify-center items-center rounded-[50px] bg-white shadow-2xl">
                  <img
                    width={150}
                    src={partner?.logo}
                    alt="img-partner"
                    className="grayscale hover:grayscale-0 duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="size-[300px] relative">
            <div
              className={`absolute ${
                langDetection === "en" ? "right-[20px]" : "left-[20px]"
              } top-0 size-[300px] flex justify-center items-center bg-gradient-to-b from-[#C6ABCE] to-[#814494] rounded-l-[50px] rounded-br-[50px] rounded-tr-[120px]`}
            ></div>
            <div>
              <a href={selectedPartner?.url} target="_blanck" className={`absolute ${
                langDetection === "en" ? "right-0" : "left-0"
              } top-0 size-[300px] flex justify-center items-center bg-white shadow-2xl rounded-l-[50px] rounded-br-[50px] rounded-tr-[120px]`}>
                <img
                  width={150}
                  src={selectedPartner?.logo}
                  alt="img-partner"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Parteners;
