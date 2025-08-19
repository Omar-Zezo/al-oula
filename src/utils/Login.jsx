import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/auth/login";
import BtnLoader from "./BtnLoader";
import { useEffect, useState } from "react";
import { t } from "i18next";

const Login = ({ showLogin, setShowLogin, langDetection }) => {
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const { data, error } = useSelector((state) => state.login);


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const dispatch = useDispatch();

  const formSubmit = (data) => {
    setShowBtnLoader(true)
    dispatch(loginUser(data));
    setShowLogin(false);
  };


  useEffect(()=>{
    if(data){
      setShowBtnLoader(false)
    }
    if(error){
      setShowBtnLoader(false)
    }
  },[data, error])

  return (
    <div
      onClick={() => setShowLogin(false)}
      className={`fixed top-0 left-0 z-[999] ${
        showLogin ? "flex" : "hidden"
      } justify-center items-center size-full bg-black/70`}
    >
      <div
        className="bg-white w-[500px] pb-10 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-5 rounded-t-xl bg-gray-200">
          <p className="text-xl text-secondryColor font-bold">
            {
              langDetection === "en" ? "Sign up / Sign in":"تسجيل / دخول"
            }
          </p>
          <FontAwesomeIcon
            className="text-xl text-zinc-500 cursor-pointer"
            icon={faX}
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="flex flex-col items-center gap-2 mt-5">
          <p className="text-xl text-secondryColor">{t('phone number')}</p>
          <form
            className="flex flex-col gap-3 w-full px-4"
            onSubmit={handleSubmit(formSubmit)}
          >
            <input
              type="number"
              autoComplete="off"
              className={`w-full p-3 ${langDetection === "en" ? 'text-left':'text-right'} rounded-md outline-mainColor border border-mainColor`}
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
            <button
              type="submit"
              className="w-full p-3 rounded-md outline-none border-none bg-mainColor hover:bg-secondryColor duration-300 cursor-pointer text-white"
            >
              {showBtnLoader ? <BtnLoader /> : t('mobile confirmation')}
            </button>
            <p className={`w-[90%] text-sm text-slate-700 font-medium ${langDetection === "en" ? 'text-left mr-auto':'text-right ml-auto'}`}>
              {t('confirmation message will be sent')}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
