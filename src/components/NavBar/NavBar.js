import React from "react";
import Logo from "../../assets/SpaceX_Logo.png";
import "./NavBar.styles.scss";

function NavBar() {
  return (
    <div className="navBar">
      <img className="navBar__logo" src={Logo} alt="SpaceX Logo" />
    </div>
  );
}

export default NavBar;
