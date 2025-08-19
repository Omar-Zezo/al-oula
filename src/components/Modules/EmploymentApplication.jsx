import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../constant";
import JobCard from "../../components/Cards/JobCard";
import { getJobs } from "../../store/slices/about us/jobs";
import { applyForJob } from "../../store/slices/about us/applyJob";
import BtnLoader from "../../utils/BtnLoader";
import UseSettings from "../../hooks/UseSettings";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const EmploymentApplication = () => {
  const [allJobs, setAllJobs] = useState(null);
  const [jobsList, setJobsList] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data } = useSelector((state) => state.jobs);
  const applyJobData = useSelector((state) => state.applyJob);

  const dispatch = useDispatch();

  const settings = UseSettings();
  const langDetection = UseLangDetection()

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    dispatch(getJobs());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.jobs) {
            setAllJobs(data.data.data.jobs);
            const formattedJobsList = data.data.data.jobs.map((job) => ({
              value: job?.id,
              label: job?.title,
            }));
            setJobsList(formattedJobsList);
          }
        }
      }
    }
  }, [data]);

  const gender = [
    { value: "male", label: t('male') },
    { value: "female", label: t('female') },
  ];

  const options = [
    { value: "yes", label: t('yes') },
    { value: "no", label: "no" },
  ];

  // apply for a job
  const formSubmit = (data) => {
    setShowBtnLoader(true);
    // FormData
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("age", data.age);
    formData.append("gender", data.gender?.value);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("ident_num", data.ident_num);
    formData.append("city", data.city);
    formData.append("qualification", data.qualification);
    formData.append("specialization", data.specialization);
    formData.append("do_you_work", data.do_you_work?.value);
    formData.append("years_of_experience", data.years_of_experience);
    formData.append("current_place_of_work", data.current_place_of_work);
    formData.append("about_your_experiences", data.about_your_experiences);
    formData.append("job_id", Number(data.job_id?.value));
    formData.append("endorsement", data.endorsement === true ? "ok" : "no");

    // if image with data
    if (data.cv?.[0]) {
      formData.append("cv", data.cv[0]);
    }

    // dispatch data
    dispatch(applyForJob(formData));
  };

  //handel btn loader
  useEffect(() => {
    if (applyJobData.data) {
      setShowBtnLoader(false);
    }
    if (applyJobData.error) {
      setShowBtnLoader(false);
    }
  }, [applyJobData]);

  return (
    <div className="container">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          {allJobs?.map((job, index) => (
            <div key={job?.id} onClick={() => setSelectedIndex(index)}>
              <JobCard job={job} index={index} selectedIndex={selectedIndex} />
            </div>
          ))}
        </div>
        {settings?.enable_employment_applications ? (
          <div className="flex flex-col gap-5">
            <h4 className="text-mainColor text-2xl font-semibold">{t('employment application')}</h4>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="flex flex-col gap-3">
                <p className="text-lg text-[#444] font-semibold">
                  {t('personal information')}
                </p>
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('full name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder={t('full name')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("full_name", {
                        required: t('this field is required'),
                        minLength: {
                          value: 8,
                          message: t('the name must be 8 characters or more'),
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.full_name?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="age"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('age')}
                    </label>
                    <input
                      id="age"
                      type="number"
                      placeholder="العمر"
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("age", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.age?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="notional-id"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('id number')}
                    </label>
                    <input
                      id="notional-id"
                      type="number"
                      placeholder={t('id number')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("ident_num", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.ident_num?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label className="text-base text-[#444] font-bold pr-5">
                      {t('gender')}
                    </label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: t('this field is required')}}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={gender}
                          styles={customStyles}
                          placeholder={t('gender')}
                          className="bg-[#f1f1f1] hover:outline-mainColor p-2 text-base rounded-[50px] outline-none border"
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption)
                          }
                        />
                      )}
                    />
                    <p className="px-2 text-red-600 text-sm font-medium">
                      {errors.gender?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <p className="text-lg text-[#444] font-semibold">
                  {t('contact information')}
                </p>
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('phone number')}
                    </label>
                    <input
                      id="phone"
                      autoComplete="off"
                      type="number"
                      placeholder={t('phone number')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("phone", {
                        required: t('this field is required'),
                        pattern: {
                          value: /^(05\d{8}|5\d{8})$/,
                          message: t('we accept Saudi numbers only'),
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
                      {t('email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder={t('email')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("email", {
                        required: t('this field is required'),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t('invalid email'),
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.email?.message}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="city"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('city')}
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder={t('city')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("city", {
                        required: t('this field is required'),
                        minLength: {value: 2, message: t('the name must be 2 letters or more')}
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.city?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <p className="text-lg text-[#444] font-semibold">
                  {t('practical experiences')}
                </p>
                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="qualification"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('qualification')}
                    </label>
                    <input
                      id="qualification"
                      type="text"
                      placeholder={t('qualification')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("qualification", {
                        required: t('this field is required'),
                        minLength: {value: 2, message:  t('the name must be 2 letters or more')}
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.qualification?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="specialization"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('specialization')}
                    </label>
                    <input
                      id="specialization"
                      type="text"
                      placeholder={t('specialization')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("specialization", {
                        required: t('this field is required'),
                        minLength: {value: 2, message: t('the name must be 2 letters or more')}
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.specialization?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label className="text-base text-[#444] font-bold px-5">
                      {t('do you work')}
                    </label>
                    <Controller
                      name="do_you_work"
                      control={control}
                      rules={{ required: t('this field is required')}}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          styles={customStyles}
                          placeholder={t('do you work')}
                          className="bg-[#f1f1f1] p-2 text-base rounded-[50px] outline-none border"
                          onChange={(selectedOption) =>
                            field.onChange(selectedOption)
                          }
                        />
                      )}
                    />
                    <p className="px-2 text-red-600 text-sm font-medium">
                      {errors.do_you_work?.message}
                    </p>
                  </div>

                  <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                    <label
                      htmlFor="years_of_experience"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('years of experience')}
                    </label>
                    <input
                      id="years_of_experience"
                      type="number"
                      placeholder={t('years of experience')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("years_of_experience", {
                        required: t('this field is required'),
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.years_of_experience?.message}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="current_place_of_work"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('current place of work')}
                    </label>
                    <input
                      id="current_place_of_work"
                      type="text"
                      placeholder={t('current place of work')}
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("current_place_of_work", {
                        required: t('this field is required'),
                        minLength: {
                          value: 3,
                          message: t('the name must be 3 letters or more'),
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors["current_place_of_work"]?.message}
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="about_your_experiences"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('about your experiences')}
                    </label>
                    <textarea
                      id="about_your_experiences"
                      placeholder={t('about your experiences')}
                      className="p-5 outline-mainColor h-[200px] bg-[#f1f1f1] rounded-lg resize-none"
                      {...register("about_your_experiences", {
                        required: t('this field is required'),
                        minLength: {value: 3, message: t('the name must be 3 letters or more')}
                      })}
                    ></textarea>
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors["about_your_experiences"]?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10">
                <div className="w-full max-xl:w-full flex flex-col gap-2">
                  <label className="text-base text-[#444] font-bold px-5">
                    {t('choose a job')}
                  </label>
                  <Controller
                    name="job_id"
                    control={control}
                    rules={{ required: t('this field is required')}}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={jobsList}
                        styles={customStyles}
                        placeholder={t('choose a job')}
                        className="bg-[#f1f1f1] p-2 text-base rounded-[50px] outline-none border"
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption)
                        }
                      />
                    )}
                  />
                  <p className="px-2 text-red-600 text-sm font-medium">
                    {errors.job_id?.message}
                  </p>
                </div>

                <div className="flex justify-between gap-5 flex-wrap">
                  <div className="w-full flex flex-col gap-2">
                    <label
                      htmlFor="cv"
                      className="px-5 text-[#444] text-base font-medium"
                    >
                      {t('attach your CV')}
                    </label>
                    <input
                      id="cv"
                      type="file"
                      className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                      {...register("cv", {
                        required: t('this field is required'),
                        validate: (value) => {
                          if (value && value[0]?.type !== "application/pdf") {
                            return t('the file must be in PDF format');
                          }
                        },
                      })}
                    />
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.cv?.message}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="w-full mx-auto flex gap-2 pr-5 items-center">
                      <input
                        id="endorsement"
                        type="checkbox"
                        className="p-5 size-4 accent-mainColor outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                        {...register("endorsement", {
                          required:
                            t('please confirm that all the information you have provided is correct')
                        })}
                      />
                      <label
                        htmlFor="endorsement"
                        className="text-[#444] text-base font-medium"
                      >
                        {t('i hereby acknowledge')}
                      </label>
                    </div>
                    <p className="mt-1 px-2 text-red-600 text-sm">
                      {errors.endorsement?.message}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={`py-4 w-[15%] h-[60px] relative max-xl:w-full ${langDetection === "en" ? "rounded-r-full":"rounded-l-full"} bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer text-white text-lg font-bold`}
                  >
                    {showBtnLoader ? <BtnLoader /> : t('send')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EmploymentApplication;
