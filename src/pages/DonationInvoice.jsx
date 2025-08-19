import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../images/imgs";
import { useEffect, useState } from "react";
import { getInvoiceDetails } from "../store/slices/donation/invoiceDetails";
import { SR } from "../images/svg";
import { Link, useParams } from "react-router-dom";

const DonationInvoice = () => {
  const [details, setDetails] = useState(null);
  const { data } = useSelector((state) => state.invoiceDetails);
  const dispatch = useDispatch();
  const { donationCode } = useParams();

  useEffect(() => {
    if (donationCode) {
      dispatch(getInvoiceDetails(donationCode));
    }
  }, [donationCode]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          setDetails(data.data.data);
          console.log(data.data.data);
        }
      }
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="w-[200px] object-contain" />
          </Link>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <h2 className="text-xl text-mainColor font-bold">
              {details?.site?.name}
            </h2>
            <p className="text-gray-600">{details?.site?.address}</p>
            <p className="text-gray-600">{details?.site?.phone}</p>
            <p className="text-gray-600">{details?.site?.email}</p>
          </div>
        </div>

        <div className="flex justify-between">
        <div className="my-4">
          <p className="text-gray-700">
            نوع التبرع:{" "}
            <span className="font-semibold">{details?.donation?.type}</span>
          </p>
          <p className="text-gray-700">
            رقم العضوية:{" "}
            <span className="font-semibold">
              {details?.donor?.membership_no}
            </span>
          </p>
          <p className="text-gray-700">
            تاريخ الإيصال:{" "}
            <span className="font-semibold">
              {details?.donation?.created_at}
            </span>
          </p>
          <p className="text-gray-700">
            حالة الفاتورة:{" "}
            <span className="font-semibold text-gray-700">
              {details?.donation?.status}
            </span>
          </p>
        </div>

        <div className="flex justify-center my-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=/donation-invoice/${details?.donation?.code}`}
            alt="qr-code"
            className="mt-2"
          />
        </div>
        </div>


        <div className="my-4">
          <p className="text-gray-700">
            رقم الهاتف:{" "}
            <span className="font-semibold">{details?.donor?.phone}</span>
          </p>
          <p className="text-gray-700">
            الاسم: <span className="font-semibold">{details?.donor?.name}</span>
          </p>
          <p className="text-gray-700">
            البريد الإلكتروني:{" "}
            <span className="font-semibold">{details?.donor?.email}</span>
          </p>
        </div>

        {/* services */}
        {details?.services?.length > 0 ? (
          <>
            <h3 className="text-lg text-gray-700 font-semibold">التبرعـات</h3>
            <table className="w-full text-right border-collapse border border-gray-300 my-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border text-center border-gray-300 p-2">
                    التبرع
                  </th>
                  <th className="border text-center border-gray-300 p-2">
                    المبلغ
                  </th>
                </tr>
              </thead>
              <tbody>
                {details?.services?.map((service) => (
                  <tr>
                    <td className="border text-center border-gray-300 p-2">
                      {service?.title}
                    </td>
                    <td className="border justify-center flex items-center gap-1 border-gray-300 p-2">
                      {service?.amount}
                      <img width={15} src={SR} alt="ryal" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}

        {/* gift */}
        {details?.recipient ? (
          <>
            <h3 className="text-lg text-gray-700 font-semibold">
              تفاصيل الأهداء
            </h3>
            <table className="w-full text-right border-collapse border border-gray-300 my-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border text-center border-gray-300 p-2">
                    اسم المُرسل إليه
                  </th>
                  <th className="border text-center border-gray-300 p-2">
                    رقم الجوال
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border text-center border-gray-300 p-2">
                    {details?.recipient?.name}
                  </td>
                  <td className="border text-center border-gray-300 p-2">
                    {details?.recipient?.phone}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : null}

        <table className="w-full text-right border-collapse border border-gray-300 my-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border text-center border-gray-300 p-2">كود التبرع</th>
              <th className="border text-center border-gray-300 p-2">طريقة الدفع</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-center border-gray-300 p-2">
                {details?.donation?.code}
              </td>
              <td className="border text-center border-gray-300 p-2">
                {details?.donation?.payment_ways}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-gray-700 font-semibold text-lg text-center">
          المبلغ الإجمالي:{" "}
          <span className="text-black inline-flex items-center gap-1">
            {details?.donation?.total_amount}
            <img width={15} src={SR} alt="ryal" />
          </span>
        </p>
        <p className="text-gray-600 text-sm text-center mt-2">
          يتم استقطاع نسبة 15% من الإجمالي لتغطية التشغيل باستثناء الزكاة وسلة
          الخير
        </p>
      </div>
    </div>
  );
};

export default DonationInvoice;
