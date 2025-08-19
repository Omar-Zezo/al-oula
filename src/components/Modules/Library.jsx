import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLibrary } from "../../store/slices/about us/library";
import LibraryCard from "../Cards/LibraryCard";

const Library = () => {
  const [books, setBooks] = useState(null);
  const { data } = useSelector((state) => state.library);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLibrary());
  }, []);

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data.data.data) {
          if (data.data.data.files) {
            if (data.data.data.files.data){
              setBooks(data.data.data.files.data);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div className="container">
      <div className="flex flex-wrap gap-5">
        {
            books?.map(book=>(
                <LibraryCard key={book?.id} book={book}/>
            ))
        }
      </div>
    </div>
  );
};

export default Library;
