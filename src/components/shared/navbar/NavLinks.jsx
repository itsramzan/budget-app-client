import React, { useEffect } from "react";
import { IoExitOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { privateLinks, publicLinks } from "../../../data/navlink";

const NavLinks = ({ show, setShow }) => {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Auto hide navlinks on page chagne
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  // Handle logout
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const navlinks = isAuthenticated ? privateLinks : publicLinks;

  return (
    <div
      className={`navlinks_sm  md:navlinks_md ${
        show ? "left-0" : "left-[-100%]"
      }`}
    >
      {navlinks.map((link) => (
        <NavLink
          key={link.id}
          to={link.to}
          end
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 py-1 w-full text-primary font-semibold"
              : "flex items-center gap-2 py-1 w-full"
          }
        >
          {<link.icon />}
          {link.text}
        </NavLink>
      ))}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 btn btn-sm btn-primary rounded-md"
        >
          <IoExitOutline className="pointer-events-none" /> Logout
        </button>
      )}
    </div>
  );
};

export default NavLinks;
