import React from "react";
import { AboutBottom, AboutLeftBlur, AboutLeftShape, AboutShap1, FigureAbout } from "../../images/imgs";

const About = () => {
  return (
    <div className="mt-[120px] w-full h-[680px] relative about-gradient rounded-br-[100px] overflow-hidden">
      <img
        src={AboutLeftShape}
        alt="about-left-shape"
        className="absolute top-0 left-0 z-10"
      />
      <img
        src={AboutBottom}
        alt="about-left-shape"
        className="absolute bottom-0 right-0 z-10"
      />
       <img
        src={AboutShap1}
        alt="about-left-shape"
        className="absolute bottom-0 right-0 z-5"
      />
      <img
        src={AboutLeftBlur}
        alt="about-left-shape"
        className="absolute top-1/2 translate-y-[-40%] left-[-50%] opacity-80"
      />
      <div className="container flex justify-between items-center absolute z-[20] left-1/2 translate-x-[-50%]">
        <div className="w-[48%] flex flex-col gap-8">
          <div>
            <h2 className="text-[60px] text-mainColor font-semibold">
              عن الأولى
            </h2>
            <p className="text-xl text-mainColor leading-8 font-semibold">
              تأسست الجمعية النسائية الخيرية الأولى عام 1383 هـ وسجلت بوزارة
              العمل والشؤون الاجتماعية برقم (1) وهي أول جمعية خيرية في
              المملكة.وكانت نشأتها استجابة لاحتياجات المجتمع في ذلك الوقت
              ومواكبة للتقدم الحضاري والنهضة الحديثة التي شهدتها المملكة آنذاك.
              وبتأسيسها مهدت الجمعية الأولى الطريق أمام باقي الجمعيات الخيرية في
              المملكة لخوض المجال الاجتماعي الخيري حيث حصلت الاولى على المركز
              الاول بجائزة تميز المنظمات الغير ربحية من مؤسسة الملك خالد.ما زلنا
              نعمل بالشغف ذاته في سبيل تنمية مجتمعنا. فعلى مر السنوات،.
            </p>
          </div>
        </div>
        <div className="w-[45%]">
          <img
            src={FigureAbout}
            alt="about"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
