import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { Blogbg } from "../../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BlogSlider from "./BlogSlider";
import { t } from "i18next";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOurBlogs } from "../../store/slices/Home/ourBlogs";

const ArticalesSection = () => {
  const [blogs, setBlogs] = useState(null);
  const { data } = useSelector((state) => state.ourBlogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOurBlogs("limit="));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setBlogs(data.data.data);
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

  return blogs?.length > 0 ? (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="mt-[120px] h-[700px] relative"
    >
      <div className="w-full flex flex-col items-center absolute top-0 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {t("oula articles")}
        </h2>
      </div>
      <div className="w-full h-[300px] absolute top-32 left-0">
        <img
          src={Blogbg}
          alt="bg-donation"
          className="size-full max-xl:hidden"
        />
      </div>
      <div className="container flex flex-col gap-10 absolute left-1/2 top-40 translate-x-[-50%]">
        <BlogSlider blogs={blogs} />
        <Link
          to="/pages/blogs_sections"
          className=" w-fit mx-auto text-xl rounded-lg bg-mainColor py-4 px-16 text-white font-bold"
        >
          {t("more")}
        </Link>
      </div>
    </motion.div>
  ) : null;
};

export default ArticalesSection;
