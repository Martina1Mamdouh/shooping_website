import React from "react";
import Logo from "../images/header-logo.png";
import searchicon from "../images/searchIcon.png";
import shopppingcart from "../images/shopping-cart.png";
import { Link } from "react-router-dom";
import "./Header.css";
import Home from "../components/Home";
import { useAuth } from "../Context/GlobalState";
import { auth } from "../Firebase";
export const Header = () => {
  const handleAuthentication = () => {
    auth.signOut();
  };
  const { user, basket } = useAuth();
  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="header-logo" src={Logo} alt="logo-img" />
        </Link>
        <div className="header-search">
          <input className="header-searchInput" type="text" />
          <img className="header-searchIcon" src={searchicon} alt="logo-img" />
        </div>
        <div className="header-nav">
          <Link to={!user && "/Login"}>
            <div className="header-options" onClick={handleAuthentication}>
              <span className="header-optionLineOne">
                Hello {user ? `${user.email}` : "Guest"}
              </span>
              <span className="header-optionLineTwo">
                {user ? "Sign-Out" : "Sign-In"}
              </span>
            </div>
          </Link>
          <Link to="/Orders">
            <div className="header-options">
              <span className="header-optionLineOne"> Resturns </span>
              <span className="header-optionLineTwo"> & Orders</span>
            </div>
          </Link>
          <div className=" header-options">
            <span className="header-optionLineOne"> Your </span>
            <span className="header-optionLineTwo"> Prime</span>
          </div>
          <Link to="/checkout">
            <div className=" header-optionBasket">
              <img
                className="Shopping-icon"
                src={shopppingcart}
                alt="logo-img"
              />
              <span className="header-optionLineTwo header-basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Header;
