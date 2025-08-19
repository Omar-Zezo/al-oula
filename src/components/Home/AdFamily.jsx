import { FamilyB, Logo, WhiteLogo } from "../../images/imgs";

const AdFamily = () => {
  return (
    <div className="w-full h-[354px] mt-[120px] relative bg-mainColor">
      <div className="flex justify-center">
        <div className="w-[70%] h-[355px] rounded-tl-full rounded-bl-xl absolute right-0 top-[-1px]">
          <img
            height={355}
            src={FamilyB}
            alt="img"
            className="size-full object-cover rounded-tl-[286px] rounded-bl-[62px]"
          />
        <div className="size-full rounded-tl-[286px] rounded-bl-[62px] absolute top-0 left-0 z-10 opacity-70 bg-gradient-to-t from-[#C6ABCE] to-[#814494] bg-blend-multiply"></div>
        </div>
        <img
          src={WhiteLogo}
          alt="img"
          className="w-[18%] object-cover rounded-l-full absolute left-[6%] top-1/2 z-[15] translate-y-[-50%]"
        />
      </div>
    </div>
  );
};

export default AdFamily;
