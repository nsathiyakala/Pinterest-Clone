import React from "react";
import { Link } from "react-router-dom";
import "../styles/pincard.css"

const PinCard = ({ pin }) => {
  return (
    // <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
      <div className="card bg-white shadow position-relative overflow-hidden">
        <img src={pin.image.url} alt="" className="card-img-top" />
        <div className="overlay d-flex align-items-center justify-content-center">
          <Link
            to={`/pin/${pin._id}`} 
            className="btn btn-danger rounded-pill px-4 py-2 opacity-0"
          >
            View Pin
          </Link>
        </div>
      </div>
    // </div>
  );
};

export default PinCard;
