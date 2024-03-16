import { FaStar } from "react-icons/fa";
import { useState } from "react";
import "./rating.scss";

const Rating = () => {
  const [starRating, setStarRating] = useState(null);
  const [hover, setHover] = useState(null);

  console.log("starRating:", starRating);

  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        const handleOnChange = () => setStarRating(currentRating);

        return (
          <label>
            <input
              placeholder="Rating"
              type="radio"
              name="rating"
              value={currentRating}
              onChange={handleOnChange}
            />
            <FaStar
              className="star"
              size={20}
              color={
                currentRating <= (hover || starRating) ? "#FFC700" : "#e4e5e9"
              }
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
