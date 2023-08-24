import React from "react";
// import ChatListScreen from "../pages/ChatListScreen";

const MiddleTab = [
  {
    link: "Description",
    to: () => <ActivitiesScreen />,
  },
  {
    link: "Address",
    to: () => <MapsScreen />,
  },
  {
    //link: "Chat",
    //to: () => <ChatListScreen />,
  },
  {
    link: "Members",
    to: () => <MembersScreen />,
  },
];

export default MiddleTab;
