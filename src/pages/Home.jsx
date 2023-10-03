import React from "react";
import { Link } from "react-router-dom";
import { IoPersonOutline, IoPersonAddOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-2xl space-y-4 text-center">
        <p className="text-5xl text-primary font-bold">
          {isAuthenticated ? "Welcome back!" : "Hi there!"}
        </p>
        <p>Track your budget and make your life easy</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to={`${isAuthenticated ? "/profile" : "/register"}`}
            className="flex items-center gap-2 btn btn-primary rounded-md"
          >
            {isAuthenticated ? (
              <>
                <IoPersonOutline /> View Profile
              </>
            ) : (
              <>
                <IoPersonAddOutline /> Join Now
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
