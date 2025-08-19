import { Link } from "react-router-dom";

const HallCard = ({facility}) => {
  return (
    <div className="w-[30%] max-xl:w-full mb-10 h-fit flex flex-col items-center p-2 bg-white shadow-lg rounded-lg">
      <Link to={`/facility-details/${facility?.id}`}>
        <img
          src={facility?.cover}
          alt="hall-img"
          className="w-full h-[200px] object-cover rounded-md"
        />
      </Link>
      <Link
        to={`/facility-details/${facility?.id}`}
        className="text-base  text-[#444] hover:text-mainColor duration-300 w-[90%] text-center my-5 font-semibold mx-auto"
      >
        {facility?.name}
      </Link>
    </div>
  );
};

export default HallCard;
