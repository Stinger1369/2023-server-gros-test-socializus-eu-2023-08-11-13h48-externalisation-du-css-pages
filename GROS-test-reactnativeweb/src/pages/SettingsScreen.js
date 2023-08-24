//🇫🇷 Page d'invitation (Figma Frame 54)
//🇬🇧 Invitation Page (Figma Frame 54)

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
} from "react-native";
import styles from "./Styles/SettingsScreenCss";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Image assets

import Google from "../assets/images/google-symbol 1.svg"; //google logo
import Friendship from "../assets/images/friends.svg"; //friends logo
import settings from "../assets/images/settings.svg"; //settings logo
//importation blocked users
import blockedUser from "../assets/settings-icons/blockedUser.svg";

//importation image next2 qui est une flèche
import next2 from "../assets/images/next2.svg"; //next2 logo
import likedUsers from "../assets/settings-icons/likedUsers.svg"; //likedUsers logo
import editProfile from "../assets/settings-icons/editProfile.svg"; //editProfile logo
import medal from "../assets/settings-icons/medal.svg"; //medal logo
import closedGift from "../assets/settings-icons/closedGift.svg"; //closedGift logo
import contactUs from "../assets/settings-icons/contactUs.svg"; //contactUs logo
import news from "../assets/settings-icons/news.svg"; //news logo
import deleteAccount from "../assets/settings-icons/deleteAccount.svg"; //deleteAccount logo
import privacyPolicy from "../assets/settings-icons/privacyPolicy.svg"; //privacyPolicy logo
import termsOfSales from "../assets/settings-icons/termsOfSales.svg"; //termsOfSales logo
import legalNotice from "../assets/settings-icons/legalNotice.svg"; //legalNotice logo
import notifi from "../assets/settings-icons/notifi.svg"; //notifi logo
import JSON from "../assets/json/en.json"; //importation de notre data
import messages from "../assets/images/messenger.png"; // messages logo
//import inviteFriendsImage from "../assets/images/inviteFriends.svg";

//importation de nos pages
import BlockedUserScreen from "./SettingsPages/blockedUserScreen.js";
import ClosedGiftScreen from "./SettingsPages/closedGiftScreen.js";
import Contact from "./ContactScreen";
import DeleteAccountScreen from "./SettingsPages/deleteAccountScreen.js";
import MyProfileScreen from "./MyProfilePages/MyProfileScreen";
import LikedUsersScreen from "./SettingsPages/likedUsersScreen.js";
import NewsScreen from "./SettingsPages/newsScreen.js";
import NotifiScreen from "./SettingsPages/notifiScreen.js";
import PrivacyPolicyScreen from "./SettingsPages/privacyPolicyScreen.js";
import TermsOfSalesScreen from "./SettingsPages/termsOfSalesScreen.js";
import LegalNoticeScreen from "./SettingsPages/legalNoticeScreen.js";
import NotifScreen from "./NotificationPages/NotificationScreen";
// import ChatList from "./ChatPrivePages/ChatList";
//import MedalScreen from "./SettingsPages/medalScreen.js";
import Parrainage from "./Parrainage";
import EditProfileScreen from "./CreateProfilePages/EditProfileScreen";
import MemberShipScreen from "./MembersPages/MemberShipScreen";
//importaation de notrre assyncstora
import AsyncStorage from "@react-native-async-storage/async-storage";
//importation de notre data
import InviteFriendsScreen from "./InviteFriendsScreen";

const { setting, menu } = JSON;

//constante de navigation

//🇫🇷 A faire: ajouter les liens d'invitation
//🇬🇧 To do: add invitation links

const SettingsScreen = (props) => {
  //page des paramètres
  const navigation = useNavigation(); //constante de navigation
  //pour supprimer l'utilisateur
  const remove = async () => {
    //fonction pour supprimer l'utilisateur
    {
      /** try{
//apI
await AsyncStorage.removeItem('userToken')
//naavigation sur la page
navigation.navigate('Home', { screen: 'HomeScreen' });
}catch (error){
alert(error)
} */
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={settings} style={styles.logo} />
          </View>
          <View style={styles.socialContainer}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("BlockedUserScreen")}>
          <View style={styles.social}>
            <img src={blockedUser} style={styles.socialImage} />
            <Text style={styles.txt}>{setting.textBlockedUsers}</Text>
            <View style={styles.arrowContainer}>
              <img src={next2} style={styles.arrowImage} />
            </View>
          </View>
        </TouchableOpacity> */}
            {/**touche de notre view edit likedUsers*/}
            {/**Pour le moment en commentaire**/}
            {/**<TouchableOpacity onPress={() => navigation.navigate("likedUsersScreen")}>
          <View style={styles.social}>
            <img src={likedUsers} style={styles.socialImage} />
            <Text style={styles.txt}>{setting.textLikedUsers}</Text>
            <View style={styles.arrowContainer}>
              <img src={next2} style={styles.arrowImage} />
            </View>
          </View>
        </TouchableOpacity>**/}

            {/**touche de notre view edit profile*/}
            <TouchableOpacity
              onPress={() => navigation.navigate("Edit Profile")}
            >
              <View style={styles.social}>
                <Image source={editProfile} style={styles.socialImage} />
                <Text style={styles.txt}>{props.scr.menu.edit}</Text>
                <View style={styles.arrowContainer}>
                  <Image source={next2} style={styles.arrowImage} />
                </View>
              </View>
            </TouchableOpacity>
            {/* Redirection to InviteFriendsScreen Maintenant le 06/08/2023 dans le CustomDrawerContent.js */}
            {/* <TouchableOpacity
              onPress={() => navigation.navigate("Invite Friends")}
            >
              <View style={styles.social}>
                <Image source={inviteFriendsImage} style={styles.socialImage} />
                <Text style={styles.txt}>{props.scr.menu.invite}</Text>
                <View style={styles.arrowContainer}>
                  <Image source={next2} style={styles.arrowImage} />
                </View>
              </View>
            </TouchableOpacity> */}
            {/**touche de notre view Medals*/}
            {/* <TouchableOpacity onPress={() => navigation.navigate("MemberShipScreen")}>
            <View style={styles.social}>
              <img src={medal} style={styles.socialImage} />
              <Text style={styles.txt}>{setting.textMedals}</Text>
              <View style={styles.arrowContainer}>
                <img src={next2} style={styles.arrowImage} />
              </View>
            </View>
          </TouchableOpacity> */}
            {/**touche de notre view Sponsorship*/}
            {/**Pour le moment en commentaire**/}
            {/**
          <TouchableOpacity onPress={() => navigation.navigate("Parrainage")}>
            <View style={styles.social}>
              <img src={closedGift} style={styles.socialImage} />
              <Text style={styles.txt}>{setting.textSponsorship}</Text>
              <View style={styles.arrowContainer}>
                <img src={next2} style={styles.arrowImage} />
              </View>
            </View>
          </TouchableOpacity>
          **/}
            {/**touche de notre view notification */}
            {/**Pour le moment en commentaire**/}
            {/* {
            //Debut creation de notification pour demander la liste de participants et notes des utilisateurs
         <TouchableOpacity onPress={() => navigation.navigate("NotifScreen")}>
            <View style={styles.social}>
              <img src={notifi} style={styles.socialImage} />
              <Text style={styles.txt}>{setting.textNotifications}</Text>
              <View style={styles.arrowContainer}>
                <img src={next2} style={styles.arrowImage} />
              </View>
            </View>
          </TouchableOpacity>
          } */}
            {/**touche de notre view contact */}
            <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
              <View style={styles.social}>
                <Image source={contactUs} style={styles.socialImage} />
                <Text style={styles.txt}>{props.scr.menu.contact}</Text>
                <View style={styles.arrowContainer}>
                  <Image source={next2} style={styles.arrowImage} />
                </View>
              </View>
            </TouchableOpacity>

            {/**touche de notre view New */}
            <TouchableOpacity onPress={() => navigation.navigate("News")}>
              <View style={styles.social}>
                <Image source={news} style={styles.socialImage} />
                <Text style={styles.txt}>{props.scr.menu.news}</Text>
                <View style={styles.arrowContainer}>
                  <Image source={next2} style={styles.arrowImage} />
                </View>
              </View>
            </TouchableOpacity>

            {/**touche de notre view messages */}
            {/**Pour le moment en commentaire**/}
            {/* <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
              <View style={styles.social}>
                <img src={messages} style={styles.socialImage} />
                <Text style={styles.txt}>{setting.textMessages}</Text>
                <View style={styles.arrowContainer}>
                  <img src={next2} style={styles.arrowImage} />
                </View>
              </View>
            </TouchableOpacity> */}

            {/**touche de notre delete my account  */}
            {/**Pour le moment en commentaire **/}
            {/**<TouchableOpacity onPress={() => navigation.navigate("DeleteAccount")}>
            <View style={styles.social}>
              <img src={deleteAccount} style={styles.socialImage} />
              <Text style={styles.txt}>{setting.textDeleteMyAccount}</Text>
              <View style={styles.arrowContainer}>
                <img src={next2} style={styles.arrowImage} />
              </View>
            </View>
        </TouchableOpacity>**/}
            {/**touche de notre Legal notice */}
            {/**Pour le moment en commentaire **/}
            {/**
          <TouchableOpacity onPress={() => navigation.navigate("legalNoticeScreen")}>
            <View style={styles.social}>
              <img src={legalNotice} style={styles.socialImage} />
              <Text style={styles.txt}>{setting.textLegalNotice}</Text>
              <View style={styles.arrowContainer}>
                <img src={next2} style={styles.arrowImage} />
              </View>
            </View>
          </TouchableOpacity>
          **/}

            {/**touche de notre privacy policy */}
            {/**Pour le moment en commentaire **/}
            {/**
          <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicyScreen")}>
            <View style={styles.social}>
              <img src={privacyPolicy} style={styles.socialImage} />
              <Text style={styles.txt}>{setting.textPrivacyPolicy}</Text>
              <View style={styles.arrowContainer}>
                <img src={next2} style={styles.arrowImage} />
              </View>
            </View>
          </TouchableOpacity>
          **/}

            {/**touche de notre TermsOfSales */}
            {/**Pour le moment en commentaire **/}

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.termsandconditionsgenerator.com/live.php?token=lkCADkefwST3eZ61BvL6lZv3ppyMd3An"
                  //Inserer le lien de CGU
                )
              }
            >
              <View style={styles.social}>
                <Image source={termsOfSales} style={styles.socialImage} />
                <Text style={styles.txt}>{props.scr.menu.terms}</Text>
                <View style={styles.arrowContainer}>
                  <Image source={next2} style={styles.arrowImage} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
