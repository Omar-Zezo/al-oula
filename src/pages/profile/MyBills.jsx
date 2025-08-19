import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../store/slices/profile/invoices";
import BillCard from "../../components/Cards/BillCard";
import Pagination from "../../utils/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import HyperPayWidget from "../../utils/HyperPayWidget";
import { t } from "i18next";

const MyBills = () => {
  const [allBills, setAllBills] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentObj, setPaymentObj] = useState(null);
  const [showHyperPayPopup, setShowHyperPayPopup] = useState(false);
  const [total, setTotal] = useState(null);
  const { data } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const handlePageClick = (event) => {
    navigate(`?page=${event.selected + 1}`);
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
      dispatch(getInvoices({ str: `page=${page}` }));
    } else {
      dispatch(getInvoices({ str: `page=${currentPage}` }));
    }
  }, [page]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.bills) {
            if (data.data.data.bills.meta) {
              if (data.data.data.bills.meta.total) {
                setTotal(data.data.data.bills.meta.total);
              }
            }
            if (data.data.data.bills.data) {
              setAllBills(data.data.data.bills.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
      <div className="flex flex-col gap-10">
        <h4 className="text-2xl text-center text-slate-900 font-semibold relative pb-2 title-line">
          {t('my bills')}
        </h4>
        <div className="flex flex-col gap-5 overflow-x-auto">
          <div className="flex flex-wrap justify-between">
            {allBills?.map((item) => (
              <BillCard
                key={item?.id}
                item={item}
                setPaymentObj={setPaymentObj}
                setShowHyperPayPopup={setShowHyperPayPopup}
              />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          total={total}
          handlePageClick={handlePageClick}
        />
        {showHyperPayPopup && (
          <div
            onClick={() => window.location.reload()}
            className="size-full flex items-center justify-center fixed bg-mainColor/95 top-0 z-[9999] left-0 payment-card"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <HyperPayWidget paymentObj={paymentObj} />
            </div>
          </div>
        )}
      </div>
  );
};

export default MyBills;
