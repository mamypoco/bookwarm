import { FaStar } from "react-icons/fa";
import { useState } from "react";
import "./rating.scss";

const Rating = ({ rating, setRating, readOnly = false }) => {
  //  const [starRating, setStarRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;

        const handleOnChange = () => {
          if (!readOnly) setRating(currentRating);
        };

        return (
          <label key={index}>
            {!readOnly && (
              <input
                placeholder="Rating"
                type="radio"
                name="rating"
                value={currentRating}
                onChange={handleOnChange}
                disabled={readOnly}
                style={{ display: "none" }}
              />
            )}

            <FaStar
              className="star"
              size={20}
              color={currentRating <= (hover || rating) ? "#FFC700" : "#e4e5e9"}
              onMouseEnter={() => !readOnly && setHover(currentRating)}
              onMouseLeave={() => !readOnly && setHover(null)}
              style={readOnly ? { cursor: "default" } : { cursor: "pointer" }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
