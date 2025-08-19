import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getMsgTypes } from "../../store/slices/about us/contactus/msgTypes";
import { useEffect, useState } from "react";
import { customStyles } from "../../constant";
import { getContactInfo } from "../../store/slices/Home/contactus";
import { makeContactusMsg } from "../../store/slices/about us/contactus/contactusMsg";
import BtnLoader from "../../utils/BtnLoader";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const ContactForm = () => {
  const [msgTypesList, setMsgTypesList] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const { data } = useSelector((state) => state.contactInfo);
  const msgTypesData = useSelector((state) => state.msgTypes);
  const contactMsgData = useSelector((state) => state.contactusMsg);

  const langDetection = UseLangDetection();

  useEffect(() => {
    dispatch(getContactInfo());
  }, []);

  // get contact info
  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.contacts) {
            setContactInfo(data.data.data.contacts);
          }
        }
      }
    }
  }, [data]);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMsgTypes());
  }, []);



  //get msg types
  useEffect(() => {
    if (msgTypesData) {
      if (msgTypesData.data) {
        if (msgTypesData.data.data) {
          if (msgTypesData.data.data.data) {
            const formattedTypesList = msgTypesData.data.data.data.map(
              (type) => ({
                value: type?.id,
                label: type?.name,
              })
            );
            setMsgTypesList(formattedTypesList);
          }
        }
      }
    }
  }, [msgTypesData]);

  //submit msg form
  const formSubmit = (data) => {
    setShowBtnLoader(true);
    dispatch(
      makeContactusMsg({
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        subject: data?.subject,
        message: data?.message,
        contact_type_id: `${data?.type?.value}`,
      })
    );
  };

  //handel btn loader
  useEffect(() => {
    if (contactMsgData.data) {
      setShowBtnLoader(false);
    }
    if (contactMsgData.error) {
      setShowBtnLoader(false);
    }
  }, [contactMsgData]);

  return (
    <div className="container flex max-xl:flex-col gap-4">
      <div className="w-1/2 max-xl:w-full flex flex-col gap-4">
        <h3 className="text-lg text-mainColor font-medium">
          {t("contact us")}
        </h3>
        <p className="text-[36px] max-xl:text-3xl text-[#444] font-bold">
          {t("feel free to contact us")}
        </p>
        <p className="lg:w-[70%] mt-8 text-lg text-[#7e7e7e] font-medium">
          {t("feel free to write a message")}
        </p>

        <div className={`flex gap-3 items-center mt-10`}>
          <a
            href={contactInfo?.facebook}
            target="_blanck"
            className="size-12 rounded-full flex justify-center items-center bg-[#4867aa] hover:bg-secondryColor duration-300"
          >
            <FontAwesomeIcon
              className="text-lg text-white"
              icon={faFacebookF}
            />
          </a>
          <a
            href={contactInfo?.twitter}
            target="_blanck"
            className="size-12 rounded-full flex justify-center items-center bg-[#5da9dd] hover:bg-secondryColor duration-300"
          >
            <FontAwesomeIcon className="text-lg text-white" icon={faTwitter} />
          </a>
          <a
            href={contactInfo?.linkedin}
            target="_blanck"
            className="size-12 rounded-full flex justify-center items-center bg-blue-600 hover:bg-secondryColor duration-300"
          >
            <FontAwesomeIcon
              className="text-lg text-white duration-300"
              icon={faLinkedinIn}
            />
          </a>
          <a
            href={contactInfo?.youtube}
            target="_blanck"
            className="size-12 rounded-full flex justify-center items-center bg-[#ff0000] hover:bg-secondryColor duration-300"
          >
            <FontAwesomeIcon
              className="text-lg text-white duration-300"
              icon={faYoutube}
            />
          </a>
          <a
            href={contactInfo?.instagram}
            target="_blanck"
            className="size-12 rounded-full flex justify-center items-center bg-[#f3c661] hover:bg-secondryColor duration-300"
          >
            <FontAwesomeIcon
              className="text-lg text-white duration-300"
              icon={faInstagram}
            />
          </a>
          <a
            href={contactInfo?.whatsapp}
            target="_blanck"
            className="size-12 rounded-full flex justify-center items-center bg-green-700 hover:bg-secondryColor duration-300"
          >
            <FontAwesomeIcon className="text-lg text-white" icon={faWhatsapp} />
          </a>
        </div>
      </div>

      <div className="w-1/2 max-xl:w-full max-xl:mt-10">
        <form className="w-full" onSubmit={handleSubmit(formSubmit)}>
          <div className="w-full flex justify-between flex-wrap">
            <div className="w-[49%] max-md:w-full mb-8 flex flex-col gap-2">
              <label className="text-base px-4 text-[#444] font-semibold">
                {t("full name")}
              </label>
              <input
                type="text"
                className="w-full outline-none p-4 text-base text-[#444] rounded-[50px] border border-black/10"
                placeholder={t("full name")}
                {...register("name", {
                  required: t("this field is required"),
                  minLength: {
                    value: 3,
                    message: t("the name must be 3 letters or more"),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.name?.message}
              </p>
            </div>

            <div className="w-[49%] max-md:w-full mb-8 flex flex-col gap-2">
              <label className="text-base px-4 text-[#444] font-semibold">
                {t("email")}
              </label>
              <input
                type="email"
                className="w-full outline-none p-4 text-base text-[#444] rounded-[50px] border border-black/10"
                placeholder={t("email")}
                {...register("email", {
                  required: t("this field is required"),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t("invalid email"),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div className="w-full max-md:w-full mb-8 flex flex-col gap-2">
              <label className="text-base px-4 text-[#444] font-semibold">
                {t("phone number")}
              </label>
              <input
                type="phone"
                className="w-full outline-none p-4 text-base text-[#444] rounded-[50px] border border-black/10"
                placeholder={t("phone number")}
                autoComplete="off"
                {...register("phone", {
                  required: t("this field is required"),
                  pattern: {
                    value: /^(05\d{8}|5\d{8})$/,
                    message: t("we accept Saudi numbers only"),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.phone?.message}
              </p>
            </div>

            <div className="w-full grow flex flex-col gap-4">
              <label
                htmlFor="gender"
                className="text-base text-[#444] font-bold px-2"
              >
                {t("purpose of the message")}
              </label>
              <Controller
                id="type"
                name="type"
                control={control}
                rules={{ required: t("this field is required") }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={msgTypesList}
                    styles={customStyles}
                    placeholder={t("purpose of the message")}
                    className="bg-field p-2 text-base rounded-[50px] outline-none border"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                  />
                )}
              />
              <p className="px-2 text-red-600 text-sm font-medium">
                {errors.type?.message}
              </p>
            </div>

            <div className="w-full max-md:w-full mb-8 flex flex-col gap-2">
              <label className="text-base px-4 text-[#444] font-semibold">
                {t("subject")}
              </label>
              <input
                type="text"
                className="w-full outline-none p-4 text-base text-[#444] rounded-[50px] border border-black/10"
                placeholder={t("subject")}
                {...register("subject", {
                  required: t("this field is required"),
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.subject?.message}
              </p>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label className="text-base px-4 text-[#444] font-semibold">
                {t("message")}
              </label>
              <textarea
                type="text"
                className="w-full outline-none h-[200px] p-4 text-base text-[#444] rounded-md resize-none border border-black/10"
                placeholder={t("message")}
                {...register("message", {
                  required: t("this field is required"),
                  minLength: {
                    value: 20,
                    message: t("the text must be 20 characters or more long"),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.message?.message}
              </p>
            </div>

            <button
              type="submit"
              className={`w-[23%] h-[60px] relative mt-8 flex items-center justify-center bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer ${
                langDetection === "en" ? "rounded-r-full" : "rounded-l-full"
              } text-white text-base font-bold`}
            >
              {showBtnLoader ? <BtnLoader /> : t("send")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
