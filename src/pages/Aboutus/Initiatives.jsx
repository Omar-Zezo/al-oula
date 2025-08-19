import React, { useEffect, useState } from "react";
import { AboutCover } from "../../images/imgs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getInitiativesList } from "../../store/slices/about us/initiatives";
import InitiativeCard from "../../components/Cards/InitiativeCard";
import { Helmet } from "react-helmet";
import UseSettings from "../../hooks/UseSettings";

const Initiatives = () => {
  const [initiativesList, setInitiativesList] = useState(null);

  const initiativesData = useSelector((state) => state.initiatives);

  const dispatch = useDispatch();
  const settings = UseSettings();

  useEffect(() => {
    dispatch(getInitiativesList());
  }, []);

  useEffect(() => {
    if (initiativesData) {
      if (initiativesData.data) {
        if (initiativesData.data.data) {
          if (initiativesData.data.data.data) {
            if (initiativesData.data.data.data.initiatives) {
              if (initiativesData.data.data.data.initiatives.data) {
                console.log(initiativesData.data.data.data.initiatives.data);
                setInitiativesList(
                  initiativesData.data.data.data.initiatives.data
                );
              }
            }
          }
        }
      }
    }
  }, [initiativesData]);

  return (
    <div>
      <Helmet>
        <title>{`${settings?.name} - مبادرات الأولى`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      <div className="h-[400px] bg-mainColor rounded-b-[80px] relative">
        <img
          src={AboutCover}
          alt="about-cover"
          className="size-full absolute left-0 top-0 object-cover rounded-b-[80px]"
        />
        <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 rounded-b-[80px]"></div>
      </div>
      <div className="w-fit px-20 h-[100px] mr-24 flex justify-center items-center bg-gradient-to-b from-[#703c80] to-[#8d579e] rounded-br-[50px]">
        <p className="text-[40px] text-white font-semibold">مبادرات الأولى</p>
      </div>

      <div className="flex flex-col mt-[120px]">
        <div className="flex flex-col">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              className="text-mainColor text-5xl"
              icon={faQuoteRight}
            />
            <h2 className="text-5xl text-mainColor text-center font-bold">
              مبادرات الأولى
            </h2>
          </div>

          <div className="mt-20">
            <div className="container">
              <div className="flex justify-between gap-10 flex-wrap">
                {initiativesList?.map((initiative) => (
                  <InitiativeCard initiative={initiative} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiatives;
