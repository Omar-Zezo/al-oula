import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../constant";
import { volunteerJoin } from "../../store/slices/forms/volunteerForm";
import { getVolunteeringTimes } from "../../store/slices/forms/volunteeringTimes";
import BtnLoader from "../../utils/BtnLoader";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const Volunteer = () => {
  const [volunteeringTimes, setVolunteeringTimes] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);

  const volunteerFormData = useSelector((state) => state.volunteerForm);
  const volunteeringTimesData = useSelector((state) => state.volunteeringTimes);

  const dispatch = useDispatch();
  const langDetection = UseLangDetection();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const socialStatus = [
    { value: "single", label: langDetection === "en" ? "Single" : "أعزب/باء" },
    { value: "married", label: langDetection === "en" ? "Married" : "متزوج/ة" },
  ];

  // apply for a job
  const formSubmit = (data) => {
    setShowBtnLoader(true);
    // FormData
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("appointments", data.appointments);
    formData.append("fields", data.fields);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("ident_num", data.ident_num);
    formData.append("job_title", data.job_title);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);
    formData.append("job_id", Number(data.job_id?.value));
    formData.append("skills", data.skills);
    formData.append("volunteering_time", data.volunteering_time?.value);

    // if image with data
    if (data.cv?.[0]) {
      formData.append("cv", data.cv[0]);
    }

    // dispatch data
    dispatch(volunteerJoin(formData));
  };

  useEffect(() => {
    dispatch(getVolunteeringTimes());
  }, []);

  //volunteering Times
  useEffect(() => {
    if (volunteeringTimesData) {
      if (volunteeringTimesData.data) {
        if (volunteeringTimesData.data.data) {
          if (volunteeringTimesData.data.data.data) {
            const formattedvolunteeringTimes =
              volunteeringTimesData.data.data.data.map((time) => ({
                value: time,
                label: time,
              }));
            setVolunteeringTimes(formattedvolunteeringTimes);
          }
        }
      }
    }
  }, [volunteeringTimesData]);

  //handel btn loader
  useEffect(() => {
    if (volunteerFormData.data) {
      setShowBtnLoader(false);
    }
    if (volunteerFormData.error) {
      setShowBtnLoader(false);
    }
  }, [volunteerFormData]);

  return (
    <div className="container">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <h4 className="text-mainColor text-2xl font-semibold">
            {t("volunteer form")}
          </h4>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col gap-3">
              <p className="text-lg text-[#444] font-semibold">
                {t("personal information")}
              </p>
              <div className="flex justify-between gap-5 flex-wrap">
                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("full name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t("full name")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("full_name", {
                      required: t("this field is required"),
                      minLength: {
                        value: 3,
                        message: t("the name must be 3 letters or more"),
                      },
                    })}
                  />
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.full_name?.message}
                  </p>
                </div>

                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label
                    htmlFor="notional-id"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("id number")}
                  </label>
                  <input
                    id="notional-id"
                    type="number"
                    placeholder={t("id number")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("ident_num", {
                      required: t("this field is required"),
                      minLength: {
                        value: 10,
                        message: t("the ID number must consist of 10 digits"),
                      },
                    })}
                  />
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.ident_num?.message}
                  </p>
                </div>

                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label className="text-base text-[#444] font-bold px-5">
                    {t("marital status")}
                  </label>
                  <Controller
                    name="social_status"
                    control={control}
                    rules={{ required: t("this field is required") }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={socialStatus}
                        styles={customStyles}
                        placeholder={t("marital status")}
                        className={`bg-[#f1f1f1] p-2 text-base rounded-[50px] outline-none border ${
                          langDetection === "en" ? "text-left" : "text-right"
                        }`}
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption)
                        }
                      />
                    )}
                  />
                  <p className="px-2 text-red-600 text-sm font-medium">
                    {errors.social_status?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <p className="text-lg text-[#444] font-semibold">
                {t("contact information")}
              </p>
              <div className="flex justify-between gap-5 flex-wrap">
                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("phone number")}
                  </label>
                  <input
                    dir="ltr"
                    id="phone"
                    type="number"
                    placeholder={t("phone number")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
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

                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t("email")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
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
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <p className="text-lg text-[#444] font-semibold">
                {t("practical experiences")}
              </p>
              <div className="flex justify-between gap-5 flex-wrap">
                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label
                    htmlFor="qualification"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("qualification")}
                  </label>
                  <input
                    id="qualification"
                    type="text"
                    placeholder={t("qualification")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("qualification", {
                      required: t("this field is required"),
                      minLength: {
                        value: 3,
                        message: t("the name must be 3 letters or more"),
                      },
                    })}
                  />
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.qualification?.message}
                  </p>
                </div>

                <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                  <label
                    htmlFor="years_of_experience"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("job title")}
                  </label>
                  <input
                    id="job_title"
                    type="text"
                    placeholder={t("job title")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("job_title", {
                      required: t("this field is required"),
                      minLength: {
                        value: 3,
                        message: t("the name must be 3 letters or more"),
                      },
                    })}
                  />
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.job_title?.message}
                  </p>
                </div>

                <div className="w-[48%] flex flex-col gap-2">
                  <label
                    htmlFor="appointments"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("the right day to volunteer")}
                  </label>
                  <input
                    id="appointments"
                    type="text"
                    placeholder={t("the right day to volunteer")}
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("appointments", {
                      required: t("this field is required"),
                      minLength: {
                        value: 3,
                        message: t("the name must be 3 letters or more"),
                      },
                    })}
                  />
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors["appointments"]?.message}
                  </p>
                </div>

                <div className="w-[48%] xl:mt-[-5px] grow flex flex-col gap-4">
                  <label
                    htmlFor="gender"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("good time to volunteer")}
                  </label>
                  <Controller
                    id="volunteering_time"
                    name="volunteering_time"
                    control={control}
                    rules={{ required: t("this field is required") }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={volunteeringTimes}
                        styles={customStyles}
                        placeholder={t("good time to volunteer")}
                        className={`bg-[#f1f1f1] rounded-[50px] p-3 text-base outline-none border ${
                          langDetection === "en" ? "text-left" : "text-right"
                        }`}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                        }}
                      />
                    )}
                  />
                  <p className="px-2 text-red-600 text-sm font-medium">
                    {errors["volunteering_time"]?.message}
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="skills"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("about your skills")}
                  </label>
                  <textarea
                    id="skills"
                    placeholder={t("about your skills")}
                    className={`p-5 outline-mainColor h-[200px] bg-[#f1f1f1] rounded-lg resize-none ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("skills", {
                      required: t("this field is required"),
                      minLength: {
                        value: 3,
                        message: t("the name must be 3 letters or more"),
                      },
                    })}
                  ></textarea>
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.skills?.message}
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="experience"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("about your work experience")}
                  </label>
                  <textarea
                    id="experience"
                    placeholder={t("about your work experience")}
                    className={`p-5 outline-mainColor h-[200px] bg-[#f1f1f1] rounded-lg resize-none ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("experience", {
                      required: t("this field is required"),
                      minLength: {
                        value: 3,
                        message: t("the name must be 3 letters or more"),
                      },
                    })}
                  ></textarea>
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.experience?.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="experience"
                  className="px-5 text-[#444] text-base font-medium"
                >
                  {t("preferred fields of volunteering")}
                </label>
                <textarea
                  id="fields"
                  placeholder={t("preferred fields of volunteering")}
                  className={`p-5 outline-mainColor h-[200px] bg-[#f1f1f1] rounded-lg resize-none ${
                    langDetection === "en" ? "text-left" : "text-right"
                  }`}
                  {...register("fields", {
                    required: t("this field is required"),
                    minLength: {
                      value: 3,
                      message: t("the name must be 3 letters or more"),
                    },
                  })}
                ></textarea>
                <p className="mt-1 pr-2 text-red-600 text-sm">
                  {errors.fields?.message}
                </p>
              </div>

              <div className="flex justify-between gap-5 flex-wrap">
                <div className="w-full flex flex-col gap-2">
                  <label
                    htmlFor="cv"
                    className="px-5 text-[#444] text-base font-medium"
                  >
                    {t("attach your CV")}
                  </label>
                  <input
                    id="cv"
                    type="file"
                    className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${
                      langDetection === "en" ? "text-left" : "text-right"
                    }`}
                    {...register("cv", {
                      required: t("this field is required"),
                    })}
                  />
                  <p className="mt-1 px-2 text-red-600 text-sm">
                    {errors.cv?.message}
                  </p>
                </div>

                <button
                  type="submit"
                  className={`py-4 w-[15%] h-[60px] relative max-xl:w-full ${
                    langDetection === "en" ? "rounded-r-full" : "rounded-l-full"
                  } bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer text-white text-lg font-bold`}
                >
                  {showBtnLoader ? <BtnLoader /> : t("send")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
