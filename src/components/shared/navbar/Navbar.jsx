import React, { useState } from "react";
import NavLogo from "./NavLogo";
import NavThemeSwitch from "./NavThemeSwitch";
import NavLinks from "./NavLinks";
import NavToggle from "./NavToggle";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex justify-between items-center h-16 px-4 md:px-16 sticky top-0 z-50 backdrop-blur-md">
      <NavLogo />
      <div className="flex items-center gap-8">
        <NavLinks {...{ show, setShow }} />
        <NavThemeSwitch />
        <NavToggle {...{ show, setShow }} />
      </div>
    </div>
  );
};

export default Navbar;
