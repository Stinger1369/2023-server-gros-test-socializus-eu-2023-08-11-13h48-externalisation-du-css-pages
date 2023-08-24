//🇫🇷 Page d'invitation (Figma Frame 54)
//🇬🇧 Invitation Page (Figma Frame 54)

import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import styles from "./Styles/InviteFriendsScreenCss"
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Image assets
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
import Link from "../assets/inviteFriends-icons/linkChain.svg";

import JSON from "../assets/json/en.json";
import { Icon } from "@rneui/themed";
const { friends } = JSON;
//🇫🇷 A faire: ajouter les liens d'invitation
//🇬🇧 To do: add invitation links

const InviteFriends = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={ styles.scrollViewContainer }>
        <View style={ styles.friendshipContainer }>
          <View style={styles.friendship}>
            <Friendship />
            <Text>{friends.label}</Text>
          </View>
          
          <View style={ styles.textContainer }>
            <Text style={ styles.inviteTxt }>{friends.invite}:</Text>
          </View>
          {/*🇫🇷 les canaux de communication pour inviter des amis */}
          {/*🇬🇧 Invitation links with icons */}
          <View style={styles.social}>
            <Email width={30} height={30} alignSelf="center" marginLeft="10%" />
              {/*FR inviter des amis  à rejoindre par e-mail */}
              {/*GB invite friends to join via email */}

            <Text style={styles.txt}>{friends.inviteEmail}</Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
          <View style={styles.social}>
            <Messenger width={30} height={30} alignSelf="center" marginLeft="10%" />
             {/*FR inviter des amis à rejoindre par facebook et messenger */}
             {/*GB invite friends to join via Facebook and Messenger */}
            <Text style={styles.txt}>
              {" "}
              {friends.inviteFacebook}
            </Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
          <View style={styles.social}>
            <Whatsapp width={30} height={30} alignSelf="center" marginLeft="10%" />
             {/*FR inviter des amis  à rejoindre par whatsapp */}
             {/*GB invite friends to join via Whatsapp */}
            <Text style={styles.txt}> {friends.inviteWhatsapp}</Text>
            <View style={ styles.whatsappContainer }>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
            </View>
          </View>
          <View style={styles.social}>
            <Phone width={30} height={30} alignSelf="center" marginLeft="10%" />
             {/*FR inviter des amis à rejoindre par messagerie texte */}
             {/*GB invite friends to join by text messaging */}
            <Text style={styles.txt}> {friends.inviteMessageText}</Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
          <View style={styles.social}>
            <Twitter width={30} height={30} alignSelf="center" marginLeft="10%" />
             {/*FR inviter des amis  à rejoindre par twitter */}
             {/*GB invite friends to join via twitter */}
            <Text style={styles.txt}> {friends.inviteTwitter}</Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
          <View style={styles.social}>
            <Instagram width={30} height={30} alignSelf="center" marginLeft="10%" />
             {/*FR inviter des amis  à rejoindre par instagram */}
             {/*GB invite friends to join via Instagram */}
            <Text style={styles.txt}> {friends.inviteInstagram}</Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
          <View style={styles.social}>
            <Tiktok width={30} height={30} style={ styles.tiktokContainer } />
             {/*FR inviter des amis  à rejoindre par Tiktok*/}
             {/*GB invite friends to join via Tiktok */}
            <Text style={styles.txt}> {friends.inviteTiktok}</Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
          <View style={styles.social}>
            <Snapchat width={30} height={30} style={ styles.tiktokContainer }  />
             {/*FR inviter des amis  à rejoindre par Tiktok*/}
             {/*GB invite friends to join via Tiktok */}
            <Text style={styles.txt}> {friends.inviteTiktok}</Text>
            <View alignSelf="center" marginLeft="10%">
              <Icon name="chevron-thin-right" type="entypo" size={30} />
            </View>
          </View>
        </View>
         {/*FR navigation vers liste des amis */}
         {/*GB navigation to friends list */}
        <TouchableOpacity onPress={() => {navigation.navigate("Invite Friends")}}></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};  

export default InviteFriends;


