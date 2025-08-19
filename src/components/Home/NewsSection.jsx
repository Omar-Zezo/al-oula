import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { Blogbg } from "../../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import NewsSlider from "./NewsSlider";
import { t } from "i18next";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOurNews } from "../../store/slices/Home/ourNews";

const NewsSection = () => {
  const [news, setNews] = useState(null);
  const { data } = useSelector((state) => state.ourNews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOurNews("limit="));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setNews(data.data.data);
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

  return news?.length > 0 ? (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="mt-20 h-[600px] relative"
    >
      <div className="flex flex-col mt-10 items-center absolute top-0 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t("our news")}
        </h2>
      </div>
      <div className="w-full h-[250px] rotate-180 absolute bottom-[100px] left-0">
        <img src={Blogbg} alt="bg-donation" className="size-full" />
      </div>
      <div className="container flex flex-col gap-20 absolute left-1/2 top-[200px] translate-x-[-50%]">
        <NewsSlider news={news} />
        <Link
          to="/pages/news"
          className=" w-fit mx-auto text-xl rounded-lg bg-mainColor py-4 px-16 text-white font-bold"
        >
          {t("more")}
        </Link>
      </div>
    </motion.div>
  ) : null;
};

export default NewsSection;
