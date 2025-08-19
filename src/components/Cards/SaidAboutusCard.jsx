import parse from "html-react-parser";

const SaidAboutusCard = ({opinion}) => {
  return (
    <div className="container absolute left-1/2 translate-x-[-50%]">
      <div className="w-full flex justify-between relative">
        <div className="w-[48%] max-xl:hidden px-10 h-[680px] absolute right-0 top-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-[#C6ABCE] to-[#814494] rounded-tl-[50px] rounded-br-[50px]">
          <div className="flex flex-col gap-10">
            <div className="size-[300px] flex justify-center items-center rounded-full bg-[#C6ABCE]">
              <div className="size-[270px] rounded-full bg-white">
                <img src={opinion?.image_path} alt="img" className="size-full rounded-full object-cover"/>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <p className="text-2xl text-white font-bold">{opinion?.adjective}</p>
                <p className="text-[40px] text-white font-bold">{opinion?.name}</p>
                <p className="text-2xl text-white font-bold">{opinion?.job_title}</p>
            </div>
          </div>
        </div>

        <div className="w-[60%] max-xl:w-full max-xl:h-[550px] h-[450px] bg-white border-2 shadow-xl border-black/10 rounded-tl-2xl max-xl:rounded-br-2xl absolute left-0 top-[110px] max-xl:top-20">
          <p className="w-[80%] h-full flex items-center mr-auto p-10 text-lg leading-8 text-mainColor font-medium">
            {opinion?.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaidAboutusCard;
