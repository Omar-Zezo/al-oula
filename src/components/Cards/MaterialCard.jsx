import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";

const MaterialCard = ({ material, langDetection }) => {
  return (
    <div dir={langDetection === 'en' ? 'ltr':'rtl'} className="w-[48%] h-fit max-xl:w-full flex flex-col gap-4 p-10 bg-gray-50 shadow-md rounded-lg">
      <h3 className="text-xl text-mainColor font-bold">{material?.title}</h3>
      {
        material?.media?.length > 0 ? (
          <div className="flex items-center gap-3">
        {material?.media?.map((file, index) => (
          <a
            href={file}
            target="_blanck"
            className="flex items-center gap-3"
          >
            <FontAwesomeIcon
              className="text-xl text-orange-500"
              icon={faFile}
            />
            <p className="text-base text-blue-600 hover:text-blue-500 duration-300 font-semibold">{t('view file')}  {index + 1}</p>
          </a>
        ))}
      </div>
        ):null
      }
    </div>
  );
};

export default MaterialCard;
