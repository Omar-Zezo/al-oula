import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "../Cards/EventCard";
import { getEvents } from "../../store/slices/about us/events";
import AppointmentPopup from "../../utils/AppointmentPopup";
import UseLangDetection from "../../hooks/UseLangDetection";

const Events = () => {
  const [events, setEvents] = useState(null);
  const [showHallPopup, setShowHallPopup] = useState(false);
  const [eventId, setEventId] = useState(null);
  const { data } = useSelector((state) => state.events);

  const getEventId = (id)=>{
    setEventId(id)
    setShowHallPopup(true)
  }

  const dispatch = useDispatch();
  const langDetection = UseLangDetection()

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setEvents(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <div className="container">
      <div className="container flex flex-col gap-4">
        <h1 className="text-5xl text-mainColor text-center font-semibold">{events?.page_title}</h1>
        <div className="flex flex-wrap justify-center gap-10 mt-20">
          {events?.events?.data?.map((event) => (
            <EventCard key={event.id} event={event} getEventId={getEventId} langDetection={langDetection}/>
          ))}
          <div />
        </div>
      </div>
      <AppointmentPopup
        showHallPopup={showHallPopup}
        setShowHallPopup={setShowHallPopup}
        facility_id={false}
        event_id={eventId}
        langDetection={langDetection}
      />
    </div>
  );
};

export default Events;
