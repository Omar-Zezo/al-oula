import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { customStyles } from "../../constant";
import { beneficiariesJoin } from "../../store/slices/forms/beneficiaries/beneficiariesForm";
import { getBeneficiariesRequests } from "../../store/slices/forms/beneficiaries/beneficiariesRequests";
import BtnLoader from "../../utils/BtnLoader";
import UseSettings from "../../hooks/UseSettings";
import { t } from "i18next";
import UseLangDetection from "../../hooks/UseLangDetection";

const Beneficiaries = () => {
  const beneficiariesRequestsData = useSelector(
    (state) => state.beneficiariesRequests
  );
  const beneficiariesFormData = useSelector((state) => state.beneficiariesForm);
  const [beneficiariesNeed, setBeneficiariesNeed] = useState(null);
  const [neighborhoodsList, setNeighborhoodsList] = useState(null);
  const [showBtnLoader, setShowBtnLoader] = useState(false);

  const dispatch = useDispatch(getBeneficiariesRequests());
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
    dispatch(getBeneficiariesRequests());
  }, []);

  // get beneficiaries Requests Data
  useEffect(() => {
    if (beneficiariesRequestsData) {
      if (beneficiariesRequestsData.data) {
        if (beneficiariesRequestsData.data.data) {
          if (beneficiariesRequestsData.data.data.data) {
            setBeneficiariesNeed(beneficiariesRequestsData.data.data.data);
            if (beneficiariesRequestsData.data.data.data.neighborhoods) {
              const formattedNeighborhoodsList =
                beneficiariesRequestsData.data.data.data.neighborhoods.map(
                  (neighborhood) => ({
                    value: neighborhood?.id,
                    label: neighborhood?.name,
                  })
                );
              setNeighborhoodsList(formattedNeighborhoodsList);
            }
          }
        }
      }
    }
  }, [beneficiariesRequestsData]);

  // apply for a job
  const formSubmit = (data) => {
    setShowBtnLoader(true);
    // FormData
    const formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("name", data.name);
    formData.append("ident_num", data.ident_num);
    formData.append("num_f_members", data.num_f_members);
    formData.append("neighborhood", data.neighborhood?.value);
    formData.append("monthly_income", data.monthly_income);
    formData.append("code", beneficiariesNeed?.verification_code);
    formData.append("verification_code", data.verification_code);

    // if image with data
    if (data.ident_img?.[0]) {
      formData.append("ident_img", data.ident_img[0]);
    }

    // dispatch data
    dispatch(beneficiariesJoin(formData));
  };

  //handel btn loader
  useEffect(() => {
    if (beneficiariesFormData.data) {
      setShowBtnLoader(false);
    }
    if (beneficiariesFormData.error) {
      setShowBtnLoader(false);
    }
  }, [beneficiariesFormData]);

  return (
    <div className="container">
      <div className="flex flex-col gap-8">
        {settings?.beneficiaries_applications?.enable ? (
          settings?.beneficiaries_applications?.is_external_platform ? (
            <a href={settings?.beneficiaries_applications?.external_platform_link} target="_blanck" className="xl:w-1/2 mx-auto text-center text-white text-xl font-semibold p-5 bg-mainColor hover:bg-secondryColor duration-300 rounded-lg">التسجيل كمستفيد</a>
          ) : (
            <div className="flex flex-col gap-5">
              <h4 className="text-mainColor text-2xl font-semibold">
                {t('register as a beneficiary')}
              </h4>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-col gap-3">
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
                        className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                        {...register("name", {
                          required: "هذا الحقل مطلوب",
                          minLength: {
                            value: 3,
                            message: "يجب أن يكون الاسم 3 حروف أو أكثر",
                          },
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.name?.message}
                      </p>
                    </div>

                    <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                      <label
                        htmlFor="ident_num"
                        className="px-5 text-[#444] text-base font-medium"
                      >
                        {t('id number')}
                      </label>
                      <input
                        id="ident_num"
                        type="number"
                        placeholder={t('id number')}
                        className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                        {...register("ident_num", {
                          required: "هذا الحقل مطلوب",
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.ident_num?.message}
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                      <label
                        htmlFor="ident_img"
                        className="px-5 text-[#444] text-base font-medium"
                      >
                        {t('image of national id')}
                      </label>
                      <input
                        id="ident_img"
                        type="file"
                        className="p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px]"
                        {...register("ident_img", {
                          required: "هذا الحقل مطلوب",
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.ident_img?.message}
                      </p>
                    </div>

                    <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                      <label
                        htmlFor="num_f_members"
                        className="px-5 text-[#444] text-base font-medium"
                      >
                        {t('number of family members')}
                      </label>
                      <input
                        id="num_f_members"
                        type="number"
                        placeholder={t('number of family members')}
                        className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                        {...register("num_f_members", {
                          required: "هذا الحقل مطلوب",
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.num_f_members?.message}
                      </p>
                    </div>

                    <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                      <label
                        htmlFor="num_f_members"
                        className="px-5 text-[#444] text-base font-medium"
                      >
                        {t('family monthly income')}
                      </label>
                      <input
                        id="monthly_income"
                        type="number"
                        placeholder={t('family monthly income')}
                        className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                        {...register("monthly_income", {
                          required: "هذا الحقل مطلوب",
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.monthly_income?.message}
                      </p>
                    </div>

                    <div className="w-[48%] max-xl:w-full flex flex-col gap-2">
                      <label className="px-5 text-[#444] text-base font-medium">
                        {t('choose neighborhood')}
                      </label>
                      <Controller
                        name="neighborhood"
                        control={control}
                        rules={{ required: "هذا الحقل مطلوب" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={neighborhoodsList}
                            styles={customStyles}
                            placeholder={t('choose neighborhood')}
                            className={`bg-[#f1f1f1] p-2 text-base rounded-[50px] outline-none border ${langDetection === "en" ? 'text-left':'text-right'}`}
                            onChange={(selectedOption) =>
                              field.onChange(selectedOption)
                            }
                          />
                        )}
                      />
                      <p className="pr-2 text-red-600 text-sm font-medium">
                        {errors.neighborhood?.message}
                      </p>
                    </div>

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
                        className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                        {...register("phone", {
                          required: "هذا الحقل مطلوب",
                          pattern: {
                            value: /^(05\d{8}|5\d{8})$/,
                            message: "نقبل الأرقام السعودية فقط",
                          },
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.phone?.message}
                      </p>
                    </div>

                    <div className="w-full max-xl:w-full flex flex-col gap-2">
                      <label
                        htmlFor="verification_code"
                        className="px-5 text-[#444] text-base font-medium"
                      >
                        {t('verification code')}
                      </label>
                      <input
                        id="verification_code"
                        type="number"
                        placeholder={t('verification code')}
                        className={`p-5 outline-mainColor bg-[#f1f1f1] rounded-[50px] ${langDetection === "en" ? 'text-left':'text-right'}`}
                        {...register("verification_code", {
                          required: "هذا الحقل مطلوب",
                          minLength: {
                            value: 4,
                            message: "كود التحقق يجب ان يتكون من 4 أرقام",
                          },
                          maxLength: {
                            value: 4,
                            message: "كود التحقق يجب ان يتكون من 4 أرقام",
                          },
                        })}
                      />
                      <p className="mt-1 pr-2 text-red-600 text-sm">
                        {errors.verification_code?.message}
                      </p>
                    </div>

                    <div className="w-fit mx-auto flex items-center gap-2 p-3 bg-[#C6ABCE] shadow-lg rounded-lg text-lg text-mainColor font-semibold">
                      <p>{t('verification code')}</p>
                      <p>{beneficiariesNeed?.verification_code}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-10">
                  <div className="flex justify-between gap-5 flex-wrap">
                    <button
                      type="submit"
                      className={`py-4 w-[15%] h-[60px] flex items-center justify-center relative max-xl:w-full ${langDetection === "en" ? 'rounded-r-full':'rounded-l-full'} bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer text-white text-lg font-bold`}
                    >
                      {showBtnLoader ? <BtnLoader /> : t('send')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Beneficiaries;
