import { TypeFile, TypeImg, TypePdf, TypeVideo } from "../../images/imgs";

const MediaFileCard = ({file}) => {
  return (
    <div className="flex flex-col items-center h-[500px] border-b-[6px] bg-white border-mainColor shadow-xl rounded-xl">
      <a href={file?.file_path} target="_blank" download>
        <img
          src={
            file?.type === "image"
              ? TypeImg
              : file?.type === "pdf"
              ? TypePdf
              : file?.type === "video"
              ? TypeVideo
              : TypeFile
          }
          alt=""
          className="w-full h-[400px] object-cover rounded-t-xl"
        />
      </a>
      <a
        href={file?.file_path}
        target="_blank"
        download
        className="w-[90%] h-20 flex items-center justify-center bg-white text-center text-lg text-[#444] hover:text-mainColor duration-300 font-semibold"
      >
        {file?.display_name}
      </a>
    </div>
  );
};

export default MediaFileCard;
