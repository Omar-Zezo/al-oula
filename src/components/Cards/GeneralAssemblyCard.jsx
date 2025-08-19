
const GeneralAssemblyCard = ({member}) => {
  return (
    <div className="w-[300px] flex items-center flex-col mb-10">
      <img width={230} src={member?.image_path} alt="member-img" className="mr-4" />
      <h4 className="bg-gradient-to-t from-[#27202a] to-[#814494] mt-[-5px] w-[250px] text-center text-lg text-white font-semibold py-3 rounded-t-xl">
        {member?.adjective}
      </h4>
      <div
        style={{
          backgroundImage: `url('../name-01.svg')`,
          backgroundSize: "cover",
        }}
        className="text-white text-xl text-center font-semibold w-[98%] h-[60px] flex justify-center items-center mt-[-6px] shadow-xl"
      >
        {member?.first_name} {member?.last_name}
      </div>
      <p className="w-[250px] py-1 rounded-lg rounded-t-none border-2 border-mainColor border-t-0 text-center text-lg font-semibold text-mainColor">
        {member?.job_title}
      </p>
    </div>
  );
};

export default GeneralAssemblyCard;
