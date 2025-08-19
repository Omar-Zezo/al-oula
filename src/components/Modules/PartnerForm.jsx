import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { partnerJoin } from "../../store/slices/forms/partnerForm";
import Select from "react-select";
import { customStyles } from "../../constant";
import { getInitiativesList } from "../../store/slices/about us/initiatives";
import BtnLoader from "../../utils/BtnLoader";
import UseLangDetection from "../../hooks/UseLangDetection";
import { t } from "i18next";

const PartnerForm = () => {
  const [initiativesList, setInitiativesList] = useState(null)
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const initiativesData = useSelector((state) => state.initiatives);
  const partnerFormData = useSelector((state) => state.partnerForm);


  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();
    const langDetection = UseLangDetection()
  

  useEffect(()=>{
    dispatch(getInitiativesList())
  },[])


  useEffect(()=>{
    if(initiativesData){
      if(initiativesData.data){
        if(initiativesData.data.data){
          if(initiativesData.data.data.data){
            if(initiativesData.data.data.data.initiatives){
              if(initiativesData.data.data.data.initiatives.data){
                const formattedInitiatives = initiativesData.data.data.data.initiatives.data.map(
                  (initiative) => ({
                    value: initiative.id,
                    label: initiative.title,
                  })
                );
                setInitiativesList(formattedInitiatives);
              }
            }
          }
        }
      }
    }
  },[initiativesData])

  const [searchParams] = useSearchParams();
  const initiative_id = searchParams.get("initiative_id");

  const formSubmit = (data) => {
    setShowBtnLoader(true)
    // FormData
    const formData = new FormData();
    formData.append("initiative_id", initiative_id ?  Number(initiative_id) : data?.initiative_id?.value);
    formData.append("name", data?.name);
    formData.append("phone", data.phone);
    formData.append("ar[company_name]", data?.ar_company_name);
    formData.append("en[company_name]", data?.en_company_name);
    formData.append("ar[content]", data?.ar_content);
    formData.append("en[content]", data?.en_content);
    formData.append("position", data?.position);
    formData.append("url", data?.url);

    // if image with data
    if (data.img?.[0]) {
      formData.append("img", data.img[0]);
    }

    // dispatch data
    dispatch(partnerJoin(formData));
  };


    //handel btn loader
    useEffect(() => {
      if (partnerFormData.data) {
        setShowBtnLoader(false);
      }
      if (partnerFormData.error) {
        setShowBtnLoader(false);
      }
    }, [partnerFormData]);


  return (
    <div>
      <div className="container">
        <h1 className="text-2xl mb-10 text-mainColor font-semibold">{t('join as a partner')}</h1>
        <form
          className="xl:w-[90%] mx-auto"
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex gap-5 flex-wrap">
            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
                {t('full name')}
              </label>
              <input
                type="text"
                className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                placeholder={t('full name')}
                {...register("name", {
                  required: t('this field is required'),
                  minLength: {
                    value: 5,
                    message: t('the name must be 5 characters or more'),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.name?.message}
              </p>
            </div>

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
                {t('phone number')}
              </label>
              <input
                type="text"
                autoComplete="off"
                className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                placeholder={t('phone number')}
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

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
                {t('company name in Arabic')}
              </label>
              <input
                type="text"
                className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                placeholder={t('company name in Arabic')}
                {...register("ar_company_name", {
                  required: t('we accept Saudi numbers only'),
                  minLength: {
                    value: 5,
                    message: t('the name must be 5 characters or more'),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors?.ar_company_name?.message}
              </p>
            </div>

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
              {t('company name in english')}
              </label>
              <input
                type="text"
                className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                placeholder={t('company name in english')}
                {...register("en_company_name", {
                  required: t('this field is required'),
                  minLength: {
                    value: 5,
                    message: t('the name must be 5 characters or more'),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors?.en_company_name?.message}
              </p>
            </div>

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
                {t('company description in Arabic')}
              </label>
              <textarea
                type="text"
                className={`bg-[#f1f1f1] focus:outline-mainColor p-4 resize-none h-[100px] text-base rounded-xl outline-none border ${langDetection === "en" ? 'text-left':'text-rught'}`}
                placeholder={t('company description in Arabic')}
                {...register("ar_content", {
                  required: t('this field is required'),
                  minLength: {
                    value: 20,
                    message: t('the text must be 20 characters or more long'),
                  },
                })}
              ></textarea>
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors?.ar_content?.message}
              </p>
            </div>

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
              {t('company description in english')}
              </label>
              <textarea
                type="text"
                className={`bg-[#f1f1f1] focus:outline-mainColor p-4 resize-none h-[100px] text-base rounded-xl outline-none border ${langDetection === "en" ? 'text-left':'text-rught'}`}
                placeholder={t('company description in english')}
                {...register("en_content", {
                  required: t('this field is required'),
                  minLength: {
                    value: 20,
                    message: t('the text must be 20 characters or more long'),
                  },
                })}
              ></textarea>
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors?.en_content?.message}
              </p>
            </div>

            <div className="w-full flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
                {t('company Logo')}
              </label>
              <input
                type="file"
                className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                {...register("img", {
                  required: t('this field is required'),
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.img?.message}
              </p>
            </div>

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
              {t('job title')}
              </label>
              <input
                type="text"
                className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? "text-left":"text-right"}`}
                placeholder={t('job title')}
                {...register("position", {
                  required: t('this field is required'),
                  minLength: {value:5, message: t('the name must be 5 characters or more')}
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.position?.message}
              </p>
            </div>

            <div className="max-md:w-full w-[48%] grow flex flex-col gap-4">
              <label className="text-base text-[#444] font-bold px-2">
                {t('website')}
              </label>
              <input
                type="text"
                className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? "text-left":"text-right"}`}
                placeholder={t('website')}
                {...register("url", {
                  required: t('this field is required'),
                  pattern: {
                    value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                    message: t('please enter a valid link'),
                  },
                })}
              />
              <p className="mt-1 px-2 text-red-600 text-sm">
                {errors.url?.message}
              </p>
            </div>

            {initiative_id === null ? (
              <div className="w-full max-xl:w-full flex flex-col gap-2">
                <label className="text-base text-[#444] font-bold px-5">
                  {t('choose initiative')}
                </label>
                <Controller
                  name="initiative_id"
                  control={control}
                  rules={{ required: t('this field is required')}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={initiativesList}
                      styles={customStyles}
                      placeholder={t('choose initiative')}
                      className={`bg-[#f1f1f1] focus:outline-mainColor p-2 text-base rounded-[50px] outline-none border ${langDetection === "en" ? 'text-left':'text-right'}`}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption)
                      }
                    />
                  )}
                />
                <p className="px-2 text-red-600 text-sm font-medium">
                  {errors.initiative_id?.message}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-5 justify-between mt-10">
            <div className="max-md:w-full w-1/2 mx-auto flex flex-col gap-4">
              <button
                type="submit"
                className="bg-mainColor h-[60px] relative hover:bg-secondryColor duration-300 p-4 text-lg text-white text-center cursor-pointer font-semibold rounded-xl"
              >
                {showBtnLoader ? <BtnLoader /> : t('add')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerForm;
