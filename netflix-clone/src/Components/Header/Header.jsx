import React from "react";
import "./header.css";
// import SearchIcon from "@mui/icons-material/Search";
import NetflixLogo from "../../assets/7124274_netflix_logo_icon.png"; 
import { Search, NotificationsNone, AccountBox, ArrowDropDown } from '@mui/icons-material'; // Uncomment for icons

const Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header_container">
        {/* Left side: Logo and navigation menu */}
        <div className="header_left">
          <ul className="navLeft">
            <li>
              <img
                src={NetflixLogo}
                alt="Netflix Logo"
                className="logo"
                width="100"
              />
            </li>
            <li className="brand">Netflix</li>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>Latest</li>
            <li>My List</li>
            <li>Browse by Languages</li>
          </ul>
        </div>

        {/* Right side: User icons / search */}
        <div className="header_right">
          <ul className="navRight">
            
            <li><Search /></li>
            <li><NotificationsNone /></li>
            <li><AccountBox /></li>
            <li><ArrowDropDown /></li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
