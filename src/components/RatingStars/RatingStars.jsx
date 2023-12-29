import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const RatingStars = ({ maxStars = 5, initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{ cursor: "pointer" }}
        >
          {index + 1 <= rating ? (
            <StarIcon color="primary" fontSize="large" />
          ) : (
            <StarOutlineIcon color="primary" fontSize="large" />
          )}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
