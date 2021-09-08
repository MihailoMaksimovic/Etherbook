import React from "react";
import "./header.css";
import header from "../images/background.png";
import plane from "../images/plane.png";
import { ReactComponent as Cloud } from "../images/cloud.svg";
const Header = (props) => {
  return (
    <div>
      <Cloud className="cloud1" />
      <Cloud className="cloud2" />
      <Cloud className="cloud3" />
      <Cloud className="cloud4" />
      <div class="header">
        <p>Learn to travel</p>
        <p>Learn to love </p>
        <p>Learn to live the life</p>
      </div>
      <img src={plane} className="plane-picture" />{" "}
      <img src={header} className="header-picture" />
    </div>
  );
};

export default Header;
