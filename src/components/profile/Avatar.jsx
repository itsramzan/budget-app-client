import React from "react";
import { IoCloudUpload } from "react-icons/io5";
import AvatarUpdateModal from "./AvatarUpdateModal";

const Avatar = ({ avatar, username }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="h-40 w-40 rounded-full ring-4 ring-primary"
            />
          ) : (
            <h3 className="h-40 w-40 rounded-full flex justify-center items-center text-6xl ring-4 ring-primary text-primary font-bold">
              {username.slice(0, 1)}
            </h3>
          )}
          <AvatarUpdateModal />
        </div>

        <h3 className="text-2xl text-primary font-bold mt-2">{username}</h3>
      </div>
    </>
  );
};

export default Avatar;
