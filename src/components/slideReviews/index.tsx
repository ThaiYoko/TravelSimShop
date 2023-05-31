import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";

const SlideReviews = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const Reviews = useSelector(DataPublicSelector.Reviews);

  return (
    <div id="slide_reviews">
      <Slider {...settings}>
        {Reviews?.map((item, index) => {
          return (
            <div key={index} className="review_item">
              <div className="avatar">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-100 img-fluid"
                />
              </div>

              <h6>{item.name}</h6>
              <div className="rating">
                <span className="material-symbols-outlined">grade</span>
                <span className="material-symbols-outlined">grade</span>
                <span className="material-symbols-outlined">grade</span>
                <span className="material-symbols-outlined">grade</span>
                <span className="material-symbols-outlined">grade</span>
              </div>
              <p className="review_txt">
                <i className="fa fa-quote-left"></i>
                {item.text}
                <i className="fa fa-quote-right"></i>
              </p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlideReviews;
