import React from "react";
import './hoverGallery.scss';

const HoverGallery = ({ images }) => {
  return (
    <div className="hover-gallery">
      <div className="precise-collage">
        <div className="col-1">
          <div
            className="tall-item"
            style={{ backgroundImage: `url(${images[0]})` }}
          ></div>
        </div>
        <div className="col-2">
          <div
            className="half-item"
            style={{ backgroundImage: `url(${images[1]})` }}
          ></div>
          <div
            className="half-item"
            style={{ backgroundImage: `url(${images[2]})` }}
          ></div>
        </div>
        <div className="col-3">
          <div
            className="middle-item"
            style={{ backgroundImage: `url(${images[3]})` }}
          ></div>
        </div>
        <div className="col-4">
          <div
            className="half-item"
            style={{ backgroundImage: `url(${images[4]})` }}
          ></div>
          <div
            className="half-item"
            style={{ backgroundImage: `url(${images[5]})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HoverGallery;
