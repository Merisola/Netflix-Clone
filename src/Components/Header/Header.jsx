import React, { useState, useEffect } from "react";
import "./Header.css";
import NetflixLogo from "../../assets/7124274_netflix_logo_icon.png";
import {
  Search,
  NotificationsNone,
  AccountBox,
  ArrowDropDown,
} from "@mui/icons-material";

const Header = () => {
  const [transparent, setTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setTransparent(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`header_outer_container ${
        transparent ? "nav_transparent" : ""
      }`}
    >
      <div className="header_container">
        <ul className="navLeft">
          <li className="logo-li">
            <img
              src={NetflixLogo}
              alt="Netflix Logo"
              className="logo"
              width="100"
            />
          </li>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>Latest</li>
          <li>My List</li>
          <li>Browse by Langue</li>
        </ul>

        <ul className="navRight">
          <li>
            <Search />
          </li>
          <li>
            <NotificationsNone />
          </li>
          <li>
            <AccountBox />
          </li>
          <li>
            <ArrowDropDown />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
