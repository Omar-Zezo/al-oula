import { Link } from "react-router-dom";

const ProgramInitiativeCard = ({ initiative }) => {
  return (
    <div className="w-[410px] h-[400px] bg-white shadow-xl border-t-[10px] border-mainColor rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[80px] rounded-br-[80px] hover:translate-y-[-50px] duration-300">
      <Link to={`/pages/join_as_a_partner/${initiative?.id}`}>
        <div className="w-full h-[98%] flex flex-col gap-6 items-center p-10 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[80px] rounded-br-[80px] border-b-[10px] border-mainColor">
          <h3 className="w-[90%] mx-auto text-center text-xl text-mainColor font-semibold description2">
            {initiative?.title}
          </h3>
          <div className="w-full h-[70%]">
            <img
              src={initiative?.image_path}
              alt="img"
              className="size-full object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProgramInitiativeCard;
