import React from "react";
import { IoSunnyOutline, IoCloudyNightOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../../features/theme/themeSlice";

const NavThemeSwitch = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    dispatch(
      changeTheme({
        theme: theme === "fantasy" ? "dracula" : "fantasy",
      })
    );
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        checked={theme === "fantasy"}
        onChange={handleChangeTheme}
      />
      <IoSunnyOutline className="swap-on fill-current w-6 h-6" />
      <IoCloudyNightOutline className="swap-off fill-current w-6 h-6" />
    </label>
  );
};

export default NavThemeSwitch;
