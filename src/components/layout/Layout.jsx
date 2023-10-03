import React, { useEffect } from "react";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/Footer";
import ScrollTop from "../ui/ScrollTop";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  // Set theme
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen w-full grid grid-rows-[auto,1fr,auto] relative z-10">
      <div className="absolute top-0 left-0 h-80 w-80 bg-gradient-to-tr from-indigo-800 via-red-400 to-blue-700 blur-3xl opacity-25 -z-50 "></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 bg-gradient-to-tr from-indigo-800 via-red-400 to-blue-700 blur-3xl opacity-25 -z-50 "></div>
      <Navbar />
      <div className="px-4 md:px-16 py-4">{children}</div>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default Layout;
