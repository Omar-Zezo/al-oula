
const LibraryCard = ({book}) => {
  return (
    <div className='w-[415px] flex flex-col items-center h-[520px] border-b-[6px] border-mainColor shadow-xl rounded-xl'>
            <a href={book?.file_path} target="_blank">
            <img src={book?.image_path} alt="" className="w-full h-[400px] object-cover rounded-t-xl"/>
            </a>
            <a href={book?.file_path} target="_blank" className="w-[90%] h-[120px] flex items-center justify-center bg-white text-center text-lg text-[#444] hover:text-mainColor duration-300 font-semibold">{book?.title}</a>
        </div>
  )
}

export default LibraryCard
