import React from "react";
import { useGetProfileQuery } from "../features/user/userApi";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Avatar from "../components/profile/Avatar";
import Details from "../components/profile/Details";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";

const Profile = () => {
  const { isLoading, isError, error, data } = useGetProfileQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error?.message} />;

  const { avatar, username } = data;

  return (
    <div className="space-y-4">
      <Avatar {...{ avatar, username }} />
      <Details data={data} />
      <div>
        <ChangePasswordModal />
      </div>
    </div>
  );
};

export default Profile;
