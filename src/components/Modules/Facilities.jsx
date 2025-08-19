import HallCard from "../Cards/HallCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFacilities } from "../../store/slices/about us/facilities";
import { getFacilitiesTypes } from "../../store/slices/about us/facilitiesTypes";
import { getFacilitiesTypesFacilities } from "../../store/slices/about us/facilitiesTypesFacilities";
import { getFacilitesWithEvents } from "../../store/slices/about us/facilitesWithEvents";
import FaciltiesEventCard from "../Cards/FaciltiesEventCard";
import UseLangDetection from "../../hooks/UseLangDetection";

const Facilities = () => {
  const [facilitiesList, setFacilitiesList] = useState(null);
  const [facilitiesWithEventsList, setFacilitiesWithEventsList] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(4);
  const [selectedType, setSelectedType] = useState(null);
  const [facilitiesTypesList, setFacilitiesTypesList] = useState(null);
  const facilitiesTypesData = useSelector((state) => state.facilitiesTypes);
  const facilitieWithEventsData = useSelector((state) => state.facilitesWithEvents);
  const facilitiesTypesFacilitiesData = useSelector(
    (state) => state.facilitiesTypesFacilities
  );

  const dispatch = useDispatch();
  const langDetection = UseLangDetection()


  useEffect(() => {
    dispatch(getFacilitiesTypes());
  }, []);

  //facilite with events
  useEffect(()=>{
    if(selectedType?.has_events){
      dispatch(getFacilitesWithEvents(selectedTypeId))
    }
  },[selectedType])

//facilite with events
  useEffect(()=>{
    if(facilitieWithEventsData){
      if(facilitieWithEventsData.data){
        if(facilitieWithEventsData.data.data){
          if(facilitieWithEventsData.data.data.data){
            setFacilitiesWithEventsList(facilitieWithEventsData.data.data.data)
            console.log(facilitieWithEventsData.data.data.data)
          }
        }
      }
    }
  },[facilitieWithEventsData])

  useEffect(() => {
    if (facilitiesTypesData) {
      if (facilitiesTypesData.data) {
        if (facilitiesTypesData.data.data) {
          if (facilitiesTypesData.data.data.data) {
            setFacilitiesTypesList(facilitiesTypesData.data.data.data);
            setSelectedType(facilitiesTypesData.data.data.data[0]);
          }
        }
      }
    }
  }, [facilitiesTypesData]);

  useEffect(() => {
    dispatch(getFacilities());
  }, []);

  useEffect(() => {
    if (selectedTypeId) {
      dispatch(getFacilitiesTypesFacilities(selectedTypeId));
    }
  }, [selectedTypeId]);

  useEffect(() => {
    if (facilitiesTypesFacilitiesData) {
      if (facilitiesTypesFacilitiesData.data) {
        if (facilitiesTypesFacilitiesData.data.data) {
          if (facilitiesTypesFacilitiesData.data.data.data) {
            setFacilitiesList(facilitiesTypesFacilitiesData.data.data.data);
          }
        }
      }
    }
  }, [facilitiesTypesFacilitiesData]);


  return (
    <div className="container flex max-xl:flex-col max-xl:gap-10 justify-between">
      <ul className="w-1/4 max-xl:flex max-xl:overflow-x-auto max-xl:w-full max-xl:pb-2 h-fit xl:bg-mainColor">
        {facilitiesTypesList?.map((type) => (
          <li
            key={type?.id}
            onClick={() => {
              setSelectedTypeId(type?.id);
              setSelectedType(type);
            }}
            className={`shrink-0 text-lg ${langDetection === "en" ? 'text-left':'text-right'} ${
              selectedTypeId === type?.id ? "bg-[#C6ABCE]" : "bg-mainColor"
            } text-white p-5 flex items-center gap-2 font-semibold border-b border-white/20 cursor-pointer`}
          >
            <img width={30} src={type?.icon} alt="icon" className="ml-2" />
            {type?.title}
          </li>
        ))}
      </ul>

      <div className="w-[70%] max-xl:w-full flex flex-wrap gap-5 bg-gray-200 p-5 rounded-lg">
        {selectedType?.has_events ? (
          

          facilitiesWithEventsList?.length > 0 ? (
            facilitiesWithEventsList?.map((facility) => (
              <FaciltiesEventCard key={facility?.id} facility={facility} />
            ))
          ) : (
            <p className="w-full text-2xl text-[#444] text-center pt-20 font-semibold">
              لا يوجد محتوى
            </p>
          )




        ) : facilitiesList?.length > 0 ? (
          facilitiesList?.map((facility) => (
            <HallCard key={facility?.id} facility={facility} />
          ))
        ) : (
          <p className="w-full text-2xl text-[#444] text-center pt-20 font-semibold">
            لا يوجد محتوى
          </p>
        )}
      </div>
    </div>
  );
};

export default Facilities;
