import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="px-4 py-4 md:px-16">
      <p>
        Copyright ©
        <Link to="/" className="text-primary">
          {" "}
          Budget App
        </Link>
      </p>
    </div>
  );
};

export default Footer;
