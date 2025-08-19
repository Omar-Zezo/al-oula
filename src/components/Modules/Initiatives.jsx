import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { Blogbg } from "../../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInitiativesList } from "../../store/slices/about us/initiatives";
import InitiativesSlider from "../AboutUs/InitiativesSlider";
import { t } from "i18next";

const Initiatives = () => {
  const [initiativesList, setInitiativesList] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const { data } = useSelector((state) => state.initiatives);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitiativesList("limit=2"));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setPageTitle(data.data.data?.page_title);
          if (data.data.data.initiatives) {
            if (data.data.data.initiatives.data) {
              setInitiativesList(data.data.data.initiatives.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="h-[700px] relative xl:mb-[150px] mt-[120px] mb-20">
      <div className="flex flex-col items-center absolute top-0 left-1/2 translate-x-[-50%]">
        <FontAwesomeIcon
          className="text-mainColor text-5xl"
          icon={faQuoteRight}
        />
        <h2 className="text-5xl max-xl:text-4xl text-mainColor text-center font-bold">
          {pageTitle}
        </h2>
      </div>
      <div className="w-full h-[300px] absolute top-32 left-0">
        <img
          src={Blogbg}
          alt="bg-donation"
          className="size-full max-xl:hidden"
        />
      </div>
      <div className="container flex flex-col gap-16 absolute left-1/2 top-40 translate-x-[-50%]">
        <InitiativesSlider initiativesList={initiativesList}/>
        <Link
          to="/initiatives"
          className=" w-fit mx-auto text-xl rounded-lg bg-mainColor py-4 px-16 text-white font-bold"
        >
          {t('more')}
        </Link>
      </div>
    </div>
  );
};

export default Initiatives;
