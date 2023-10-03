import React from "react";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      Budget <span className="text-primary">App</span>
    </Link>
  );
};

export default NavLogo;
