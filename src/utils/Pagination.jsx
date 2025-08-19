import { t } from 'i18next';
import ReactPaginate from 'react-paginate';


const Pagination = ({currentPage, total, handlePageClick}) => {
  return (
    <div 
    className={` mb-5 ${Math.ceil(total / 9) > 1 ? "block" : "hidden"}`}
    >
    <ReactPaginate
      breakLabel="..."
      nextLabel={t('next')}
      forcePage={currentPage !== 0 ? currentPage -1 : 0}
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={Math.ceil(total / 9)}
      previousLabel={t('prev')}
      breakClassName="text-black-500"
      renderOnZeroPageCount={null}
      className="flex justify-center xl:gap-4 gap-2"
      pageLinkClassName="text-black-500 text-sm font-semibold min-w-8 h-8 px-1 flex items-center justify-center rounded-full border border-[#F1F1F1]"
      activeLinkClassName="bg-mainColor text-white"
      previousLinkClassName="text-mainColor w-fit h-8 text-base font-semibold px-2 flex items-center justify-center rounded-sm"
      nextLinkClassName="text-mainColor w-fit h-8 px-2 text-base font-semibold flex items-center justify-center"
      disabledLinkClassName="opacity-50 cursor-not-allowed"
    />
    </div>
  )
}

export default Pagination