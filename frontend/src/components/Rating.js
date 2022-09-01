import React from "react";
import star from "./RatingStar";
import "./rating.css";

const Rating = ({ rating, numReviews, caption }) => {
  // console.log(numReviews);
  const { starMit, starComplete, starVoid } = star;
  return (
    <div className="rating">
      <span className="rating__icono">
        <i>{rating >= 1 ? starComplete : rating >= 0.5 ? starMit : starVoid}</i>
      </span>
      <span>
        <i className="rating__icono">
          {rating >= 2 ? starComplete : rating >= 1.5 ? starMit : starVoid}
        </i>
      </span>
      <span>
        <i className="rating__icono">
          {rating >= 3 ? starComplete : rating >= 2.5 ? starMit : starVoid}
        </i>
      </span>
      <span>
        <i className="rating__icono">
          {rating >= 4 ? starComplete : rating >= 3.5 ? starMit : starVoid}
        </i>
      </span>
      <span>
        <i className="rating__icono">
          {rating >= 5 ? starComplete : rating >= 4.5 ? starMit : starVoid}
        </i>
      </span>
      {/* <span className="rating__reviews"> {numReviews}reviews</span> */}
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{"" + numReviews + " reviews"}</span>
      )}
    </div>
  );
};

export default Rating;
