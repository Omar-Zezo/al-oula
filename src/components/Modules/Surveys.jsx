import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSurveys } from "../../store/slices/about us/surveys";
import SurveyCard from "../Cards/SurveyCard";
import Pagination from "../../utils/Pagination";

const Surveys = () => {
  const [allSurveys, setAllSurveys] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const { data } = useSelector((state) => state.surveys);

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
      dispatch(getSurveys({ str: `page=${page}` }));
    } else {
      dispatch(getSurveys({ str: `page=${currentPage}` }));
    }
  }, [page]);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.data) {
            setAllSurveys(data.data.data.data);
          }
          if (data.data.data.total) {
            setTotal(data.data.data.total);
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="container">
      <div className="flex flex-col gap-8">
        <h1 className="text-5xl text-center text-mainColor font-semibold">
          الإستبيانات
        </h1>
        <div className="flex flex-wrap justify-between">
          {allSurveys?.map((survey) => (
            <SurveyCard key={survey?.id} survey={survey} />
          ))}
        </div>
        <Pagination
          handlePageClick={handlePageClick}
          currentPage={currentPage}
          total={total}
        />
      </div>
    </div>
  );
};

export default Surveys;
