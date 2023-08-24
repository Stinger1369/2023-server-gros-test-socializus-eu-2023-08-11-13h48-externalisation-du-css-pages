//🇫🇷 Page d'invitation (Figma Frame 62)
//🇬🇧 Invitation Page (Figma Frame 62)

import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import constStyle from "./Styles/InviteFriendsScreenCss";

import { useNavigation } from "@react-navigation/native";
//import { UserContext } from "../contexts/UserContext";
import Google from "../assets/images/google-symbol 1.svg";
import Friendship from "../assets/images/friends.svg";
import Email from "../assets/inviteFriends-icons/emailIcon.svg";
import Messenger from "../assets/inviteFriends-icons/messengerIcon.svg";
import Whatsapp from "../assets/inviteFriends-icons/whatsappIcon.svg";
import Phone from "../assets/inviteFriends-icons/messages.svg";
import Twitter from "../assets/inviteFriends-icons/twitterIcon.svg";
import Instagram from "../assets/inviteFriends-icons/instagramIcon.svg";
import Tiktok from "../assets/inviteFriends-icons/tik-tokIcon.svg";
import Snapchat from "../assets/inviteFriends-icons/snapchatIcon.svg";
import Arrow from "../assets/images/right-arrow.svg";
import Link from "../assets/inviteFriends-icons/linkChain.svg";
import JSON from "../assets/json/en.json";

const { inviteFriends } = JSON;
const { invitationMessage } = inviteFriends;

const InviteFriends = (props) => {
  console.log("InviteFriends:", props);
  const navigation = useNavigation();
  const [invitationCount, setInvitationCount] = useState(0);

  // Function to save invitation count to DB
  const saveInvitationCountToDB = (count) => {
    // Implement this function to save 'count' to your MongoDB
  };

  // Increment invitationCount and save to DB when inviting a friend
  const inviteFriend = (openFunction) => {
    openFunction();
    const newCount = invitationCount + 1;
    setInvitationCount(newCount);
    saveInvitationCountToDB(newCount);
  };
  //const user = useContext(UserContext);
  // Add openURL functions for each platform
  const openEmail = () =>
    Linking.openURL(`mailto:?subject=Invitation&body=${invitationMessage}`);
  const openMessenger = () =>
    Linking.openURL(`fb-messenger://user/?message=${invitationMessage}`);
  const openWhatsapp = () =>
    Linking.openURL(`whatsapp://send?text=${invitationMessage}`);
  const openTwitter = () =>
    Linking.openURL(`twitter://post?message=${invitationMessage}`);
  const openInstagram = () =>
    // Note: Instagram does not allow prefilling of captions or messages via URL.
    // You can only open the Instagram app, but not send a message directly.
    Linking.openURL("instagram://app");
  const openTiktok = () =>
    // Note: TikTok does not support deep linking for messages.
    // You can only open the TikTok app, but not send a message directly.
    Linking.openURL("tiktok://");
  const openSnapchat = () =>
    // Note: Snapchat does not support deep linking for messages.
    // You can only open the Snapchat app, but not send a message directly.
    Linking.openURL("snapchat://");
  const openTextMessage = () =>
    Linking.openURL(`sms:?&body=${encodeURIComponent(invitationMessage)}`);

  const openInviteLink = () =>
    Linking.openURL("https://install.socializus.com/");

  const sentenceParts = inviteFriends.label.split("{count}");

  return (
    <SafeAreaView style={constStyle.container}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View
          style={ constStyle.inviteStyle  }
        >
          <View style={constStyle.friendship}>
            <Image source={Friendship} style={ constStyle.friendshipImg } />
            {/* <View style={constStyle.rowContainer}>
              <View style={constStyle.countContainer}>
                <Text style={constStyle.countText}>{invitationCount}</Text>
              </View>
              <View style={constStyle.messageContainer}>
                <Text style={constStyle.messageText}>
                  {sentenceParts[1]}
                  {invitationCount}
                  {sentenceParts[2]}
                </Text>
              </View>
            </View> */}
          </View>
          <View style={ constStyle.inviteFriendsView }>
            <Text style={ constStyle.inviteFriendsStyle }>
              {props.scr.inviteFriends.invite}:
            </Text>
          </View>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openEmail)}
          >
            <Image source={Email} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {props.scr.inviteFriends.inviteEmail}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openMessenger)}
          >
            <Image source={Messenger} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {props.scr.inviteFriends.inviteFacebook}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openWhatsapp)}
          >
            <Image source={Whatsapp} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteWhatsapp}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openTextMessage)}
          >
            <Image source={Phone} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteTextMessage}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openTwitter)}
          >
            <Image source={Twitter} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteTwitter}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openInstagram)}
          >
            <Image source={Instagram} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteInstagram}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openTiktok)}
          >
            <Image source={Tiktok} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteTiktok}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openSnapchat)}
          >
            <Image source={Snapchat} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteSnapchat}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={constStyle.social}
            onPress={() => inviteFriend(openInviteLink)}
          >
            <Image source={Link} style={constStyle.imageStyle} />
            <Text style={constStyle.txt}>
              {" "}
              {props.scr.inviteFriends.inviteWithLink}
            </Text>
            <View style={constStyle.linkIcon}>
              <Image source={Arrow} style={constStyle.imageArrow} />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Invite Friends");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteFriends;
