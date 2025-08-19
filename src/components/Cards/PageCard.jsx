import parse from "html-react-parser";

const PageCard = ({page}) => {
  return (
    <div className="w-[410px] h-[400px] bg-white shadow-xl border-t-[10px] border-mainColor rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[80px] rounded-br-[80px] hover:translate-y-[-50px] duration-300">
      <div className="w-full h-[98%] flex flex-col gap-6 items-center p-10 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-[80px] rounded-br-[80px] border-b-[10px] border-mainColor">
        <h3 className="text-4xl text-mainColor font-semibold">{page?.title}</h3>
        <div className="overflow-auto">
          {page ? parse(page?.value) : null}
        </div>
      </div>
    </div>
  );
};

export default PageCard;
