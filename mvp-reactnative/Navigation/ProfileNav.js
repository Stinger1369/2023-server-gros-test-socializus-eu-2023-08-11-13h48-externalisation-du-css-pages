import React from "react";

import ProfileInfo from "../pages/ProfileInfo";
import ProfileFriends from "../pages/ProfileFriends";
import ProfileActivities from "../pages/ProfileActivities";

const ProfileNav = [
  {
    link: "Information",
    to: () => <ProfileInfo />,
  },
  {
    link: "Activites",
    to: () => <ProfileActivities />,
  },
  {
    link: "Network",
    to: () => <ProfileFriends />,
  },
];

export default ProfileNav;
