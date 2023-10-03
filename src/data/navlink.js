import {
  IoHomeOutline,
  IoPersonOutline,
  IoReaderOutline,
  IoPersonAddOutline,
  IoEnterOutline,
} from "react-icons/io5";

// Private links
export const privateLinks = [
  {
    id: 1,
    icon: IoHomeOutline,
    to: "/",
    text: "Home",
  },
  {
    id: 2,
    icon: IoPersonOutline,
    to: "/profile",
    text: "Profile",
  },
  {
    id: 3,
    icon: IoReaderOutline,
    to: "/budget",
    text: "Budget",
  },
];

// Public links
export const publicLinks = [
  {
    id: 1,
    icon: IoHomeOutline,
    to: "/",
    text: "Home",
  },
  {
    id: 2,
    icon: IoPersonAddOutline,
    to: "/register",
    text: "Register",
  },
  {
    id: 3,
    icon: IoEnterOutline,
    to: "/login",
    text: "Login",
  },
];
