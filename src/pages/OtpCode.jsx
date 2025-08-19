import { AboutCover } from "../images/imgs";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getOtpCode } from "../store/slices/auth/otpCode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import UseSettings from "../hooks/UseSettings";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../utils/BtnLoader";
import { t } from "i18next";
import UseLangDetection from "../hooks/UseLangDetection";

const OtpCode = () => {
    const [showBtnLoader, setShowBtnLoader] = useState(false);
  const { data, error } = useSelector((state) => state.otpCode);

  const settings = UseSettings();
  const navigate = useNavigate()
  const langDetection = UseLangDetection()



  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const errorMsg = (msg) => toast.error(msg);
  const successMsg = (msg) => toast.success(msg);


  useEffect(() => {
    if (data) {
      setShowBtnLoader(false)
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.token) {
            localStorage.setItem("token", data.data.data.token);
            if(localStorage.getItem('service_id_Slider')){
              navigate(localStorage.getItem('service_id_Slider'))
              successMsg(t('you have successfully logged in'))
            }else{
              navigate(-1)
              successMsg(t('you have successfully logged in'))
            }
          }
        }
      }
    }

    if (error) {
      setShowBtnLoader(false)
      if (error.data) {
        if (error.data.msg) {
          errorMsg(error.data.msg);
        }
      }
    }
  }, [data, error]);

  const dispatch = useDispatch();

  const formSubmit = (data) => {
    setShowBtnLoader(true)
    dispatch(
      getOtpCode({
        phone: localStorage.getItem("phone"),
        ...data,
      })
    );
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>{`${settings?.name} - ${t('confirm the code')}`}</title>
        <meta name="description" content={settings?.description} />
        <meta name="keywords" content={settings?.keywords} />
        <link rel="icon" type="image/png" href={settings?.icon}></link>
      </Helmet>
      <div className="h-[400px] bg-mainColor rounded-b-[80px] relative">
        <img
          src={AboutCover}
          alt="about-cover"
          className="size-full absolute left-0 top-0 object-cover rounded-b-[80px]"
        />
        <div className="size-full absolute left-0 top-0 bg-gradient-to-r from-[#C6ABCE] to-[#814494] opacity-80 rounded-b-[80px]"></div>
      </div>

      <div dir={langDetection === "en" ? 'ltr':'rtl'} className="container">
        <div className="pt-20 container">
          <div className="flex flex-col gap-4">
            <form
              className="flex max-lg:flex-col gap-3 w-full px-4"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="xl:w-1/2 w-full flex flex-col gap-2">
                <input
                  autoFocus
                  autoComplete="off"
                  type="number"
                  className=" px-3 h-14 rounded-md outline-mainColor border border-mainColor"
                  placeholder={t('enter the verification code sent to your mobile phone')}
                  {...register("otp_code", {
                    required: t('this field is required'),
                    minLength: {
                      value: 4,
                      message: t('verification code must be 4 digits'),
                    },
                  })}
                />
                <p className="mt-1 pr-2 text-red-600 text-sm">
                  {errors.otp_code?.message}
                </p>
              </div>
              <button
                type="submit"
                className="xl:w-[15%] w-full relative h-14 px-3 rounded-md outline-none border-none bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer text-white font-bold"
              >
                {showBtnLoader ? <BtnLoader /> : t('confirm the code')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpCode;
