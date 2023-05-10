import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";

const SimBanners = () => {
  const Banners = useSelector(DataPublicSelector.Banners);
  return (
    <section id="sim_banner">
      <Carousel>
        {Banners?.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.url}
                alt={item.filename}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
};

export default SimBanners;
