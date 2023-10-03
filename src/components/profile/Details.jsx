import React from "react";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCafeOutline,
  IoMaleFemaleOutline,
  IoLocationOutline,
  IoPhonePortraitOutline,
  IoCalendarOutline,
  IoStarOutline,
} from "react-icons/io5";
import moment from "moment";
import Heading from "../ui/Heading";
import DetailsUpdateModal from "./DetailsUpdateModal";

const Details = ({ data }) => {
  const details = [
    {
      id: 1,
      Icon: IoPersonOutline,
      text: "Username",
      value: data.username,
    },
    {
      id: 2,
      Icon: IoMailOutline,
      text: "Email",
      value: data.email,
    },
    {
      id: 3,
      Icon: IoCafeOutline,
      text: "Date of Birth",
      value: data.dateOfBirth
        ? moment(new Date(data.dateOfBirth).getTime()).format("Do MMM YYYY")
        : "Not available",
    },
    {
      id: 4,
      Icon: IoMaleFemaleOutline,
      text: "Gender",
      value: data.gender,
    },
    {
      id: 5,
      Icon: IoPhonePortraitOutline,
      text: "Mobile",
      value: data.mobile,
    },
    {
      id: 6,
      Icon: IoLocationOutline,
      text: "Address",
      value: data.address,
    },
    {
      id: 7,
      Icon: IoCalendarOutline,
      text: "Joined at",
      value: moment(new Date(data.createdAt).getTime()).format("Do MMM YYYY"),
    },
    {
      id: 8,
      Icon: IoStarOutline,
      text: "Account Status",
      value: data.isVerified ? "Verified" : "Unverified",
    },
  ];

  return (
    <>
      <Heading text="User Details">
        <DetailsUpdateModal {...{ data }} />
      </Heading>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {details.map((item) => {
          const { id, Icon, text, value } = item;

          return (
            <div
              key={id}
              className="bg-base-300 bg-opacity-50 border-opacity-20 p-4 rounded-md flex gap-4"
            >
              <div className="flex items-center">
                <Icon className="btn btn-sm p-[0.4rem] btn-square btn-primary" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-primary font-semibold">{text}</p>
                <p className="line-clamp-1">
                  {value ? value : "Not available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Details;
