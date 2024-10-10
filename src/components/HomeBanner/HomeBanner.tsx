import { homeBanner } from "<@>/util/images";
import React from "react";
import "./HomeBanner.css"; 

const HomeBanner = () => {
  return (
    <div className="home-banner">
      <img className="home-banner__pizza" src={homeBanner} alt="" />
      <div className="home-banner__content">
        <h1 className="home-banner__heading">Optimized your meal</h1>
        <p className="home-banner__text">
          Select meal to add in week. You will be able to edit, modify and
          change the meal weeks.
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
