import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const AddRatingStars = ({getRating}) => {
const [rateSatars, setRatestars] = useState(null)

  useEffect(()=>{
    getRating(rateSatars)
  },[rateSatars])

  
  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
            <label key={index} className="cursor-pointer mr-4 last-of-type:mr-0">
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={()=> setRatestars(ratingValue)}
            />
            <FontAwesomeIcon icon={faStar} size="2x" color={ratingValue <= rateSatars ? "#814494":"#C6ABCE"} />
          </label>
        );
      })}
    </div>
  );
};

export default AddRatingStars;