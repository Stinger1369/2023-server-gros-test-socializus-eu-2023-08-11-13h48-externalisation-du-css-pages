//🇫🇷 Barre de navigation du menu (Frame Figma 100)
//🇬🇧 Menu drawer navigation (Frame Figma 100)
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorage, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../pages/HomeScreen";
//Assets images
import Json from "../assets/json/it.json";
import ExampleCup from "../assets/user-grades-and-sponsorship/GoldCup_Gold_noStar.svg";
import { EmailCheckDialog } from "../components/Dialogs";
import ParrinageIcon from "../assets/images/cadeau_par.svg";
import ConceptIcon from "../assets/images/concept_lightbulb.svg";
import UserProfileIcon from "../assets/drawer-icons/myProfile.svg";
import ContactIcon from "../assets/settings-icons/contactUs.svg";
import InviteFriendsIcon from "../assets/drawer-icons/inviteFriends.svg";
import SettingsIcon from "../assets/drawer-icons/settings.svg";
import UpdateIcon from "../assets/drawer-icons/update.svg";
import NewsIcon from "../assets/drawer-icons/informations.svg";
import QrCodeIcon from "../assets/drawer-icons/qrCode.svg";
import LogoutIcon from "../assets/drawer-icons/logout.svg";
import Avatar from "../assets/images/image_edit_profile/avatar.svg";
import CreateActivityIcon from "../assets/drawer-icons/createActivity.svg";
import TermsOfSalesIcon from "../assets/settings-icons/termsOfSales.svg";
import usergirl from "../assets/images/image_edit_profile/user-girl.svg";
import userguy from "../assets/images/image_edit_profile/user-guy.svg";
import { Icon } from "@rneui/themed";

// import styles from './styles';

const CustomDrawerContent = (props) => {
  // console.log('test langue',props)
  const { menu } = props.scr;
  // console.log(Json)
  const isDrawerOpen = useDrawerStatus() === "open";
  const [emailCheckDialogVisible, setEmailCheckDialogVisible] = useState(false);
  //text

  const text = "Username";
  const [image, setImage] = useState();
  //🇫🇷  declaration d'une url d'image
  //🇬🇧 declaration of an image url
  useEffect(()=>{
    if(props.user != null){
      setImage(props.user.sexe === "male" ? userguy : usergirl);
    }
    else{
      setImage(Avatar);
    }
  })

  //end text

  //Role-reated functions and dialog
  const displayEmailCheckDialog = () => {
    setEmailCheckDialogVisible(!emailCheckDialogVisible);
  };

  const goToMailCheckScreen = () => {
    props.navigation.navigate("VerificationMailRole");
    displayEmailCheckDialog(!emailCheckDialogVisible);
  };

  const handleNavigationFromRole = () => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
    if (props.user?.role.name[0] === "user without confirmation") {
      displayEmailCheckDialog();
    } else {
      props.navigation.navigate("Create Activity", {
        user: props.user,
      });
    }
  };

  let avatar=image //avatar de dafault sans registration
  let us="user" //user de default sans reigration
  if(props.user != null){
    if(props.user.avatar && props.user.avatar !== "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"){
    avatar=props.user.avatar //avatar avec registration complete
    }
  }
  if(props.user != null){
    if(props.user.userName){
    us=props.user.userName //user avec registration complete
    }
  }
const navigation = useNavigation();
  return (
    <>
      <EmailCheckDialog
        dialogVisible={emailCheckDialogVisible}
        displayModal={displayEmailCheckDialog}
        goToMailCheckScreen={goToMailCheckScreen}
        user={props.user}
        scr={props.scr}
      />
      <View
        //🇫🇷si le drawer est ouvert prend le flex 1 sinon flex: 1, et change la couleur en blanc
        //🇬🇧 if the drawer is open take flex 1 otherwise flex: 1, and change the color to white
        style={
          isDrawerOpen ? { flex: 1 } : { flex: 1, backgroundColor: "white" }
        }>
        <DrawerContentScrollView
          {...props}
          //🇫🇷notre scrool qui vas permettre d'afficher notre view de drawer de couleur blanc et de padding 0
          //🇬🇧our scroll which will allow us to display our drawer view in white color and padding 0
          style={{ backgroundColor: "white", padding: 0 }}>
          {/*Style the image */}
          {isDrawerOpen && (
            <>
              <View
                style={{
                  marginTop: -4,
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  backgroundColor: "#59C09B",
                }}>
                {/*Croix pour fermer le menu */}
                {/*Icon for closing menu */}
                <View
                  style={{
                    alignSelf: "flex-end",
                    borderRadius: 50,
                    borderWidth: 0,
                  }}>
                  <Icon
                    name="close"
                    type="font-awesome"
                    size={25}
                    color="black"
                    onPress={() =>
                      props.navigation.dispatch(DrawerActions.closeDrawer())
                    }
                  />
                </View>
                {/* Début du header du menu burger */}
                {/* The menu content header */}

                <View style={styles.drawerHeader}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Profile", {
                        // action pour aller dans la page de profile, ensuite aller dans edit profile?
                        user: props.user,
                      })
                    }>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image source={avatar} style={styles.headerProfilePic} />
                      <Text style={styles.drawerLabel}>{us}</Text>
                    </View>
                  </TouchableOpacity>
                  {/* Voir dans la BDD si le user détient un trophée ou non */}
                  {/* Check in back-end if the user has a trophy */}
                  {/* <img src={ExampleCup} style={{ marginLeft: 30, width: 70 }} /> */}
                </View>
              </View>

              {/* Début du corps du menu burger */}
              {/* Menu content body */}
              <View style={{ backgroundColor: "#fff", flex: 1 }}>
                {/* Concept */}
                {/* <DrawerItem
                  icon={() => <img src={ConceptIcon} width="38" height="38" />}
                  label={menu.concept}
                  onPress={() => {
                    props.navigation.navigate("Concept");
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                /> */}

                {/* Profil */}
                <DrawerItem
                  icon={() => <img src={image} width="38" height="38" />}
                  label={menu.me}
                  onPress={() => {
                    props.navigation.navigate("Profile", {
                      // action pour aller dans la page de profile, ensuite aller dans edit profile?
                      user: props.user,
                    });
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />
                {/* Créer une activité */}
                <DrawerItem
                  icon={() => (
                    <img src={CreateActivityIcon} width="38" height="38" />
                  )}
                  label={menu.create}
                  onPress={() => handleNavigationFromRole()}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />
                {/* Inviter des amis */}
                <DrawerItem
                icon={() => (
                  <img src={InviteFriendsIcon} width="38" height="38" />
                )}
                label={menu.invite}
                onPress={() => {
                  props.navigation.navigate("Invite Friends");
                  props.navigation.dispatch(DrawerActions.closeDrawer());
                }}
                labelStyle={styles.drawerLabel}
                style={styles.drawerItemStyle}
              />

                {/* Contact us */}
                <DrawerItem
                  icon={() => <img src={ContactIcon} width="38" height="38" />}
                  label={menu.contact}
                  onPress={() => {
                    props.navigation.navigate("Contact");
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />
                {/* Invite freinds */}



                {/* Settings */}
                <DrawerItem
                  icon={() => <img src={SettingsIcon} width="38" height="38" />}
                  label={menu.settings}
                  onPress={() => {
                    props.navigation.navigate("Settings");
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />
                {/* News */}
                <DrawerItem
                  icon={() => <img src={NewsIcon} width="38" height="38" />}
                  label={menu.news}
                  onPress={() => {
                    props.navigation.navigate("News");
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />
                {/* Update */}
                <DrawerItem
                  icon={() => <img src={UpdateIcon} width="38" height="38" />}
                  label={menu.update}
                  onPress={() => {
                    props.navigation.navigate("Update");
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />

                {/* Terms and conditions */}
                <DrawerItem
                  icon={() => (
                    <img src={TermsOfSalesIcon} width="34" height="34" />
                  )}
                  label={menu.terms}
                  onPress={() => {
                    Linking.openURL(
                      "https://www.termsandconditionsgenerator.com/live.php?token=lkCADkefwST3eZ61BvL6lZv3ppyMd3An"
                      //Inserer le lien de CGU
                    );
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  }}
                  labelStyle={styles.drawerLabel}
                  style={styles.drawerItemStyle}
                />
                {/* Logout */}
                <DrawerItem
                  icon={() => <img src={LogoutIcon} width="38" height="38" />}
                  label={menu.logout}
                  onPress={async () => {
                    try {
                      await Promise.all([
                        props.setToken(null),
                        localStorage.removeItem("userToken"),
                        props.setUser("undefined"),
                        localStorage.removeItem("user"),
                        props.setGender(null),
                        localStorage.removeItem("gender"),
                        props.setAccountType(null),
                        localStorage.removeItem("accountType"),
                        props.setFirstName(null),
                        localStorage.removeItem("firstName"),
                        props.setLastName(null),
                        localStorage.removeItem("lastName"),
                        props.setNickName(null),
                        localStorage.removeItem("nickName"),
                        props.setCity(null),
                        localStorage.removeItem("city"),
                        props.setNativeLanguage(null),
                        localStorage.removeItem("nativeLanguage"),
                        props.setRole(null),
                        localStorage.removeItem("role"),
                        localStorage.removeItem("userProfile"),
                      ]);

                      console.log("Successfully logged out");

                      // Recharger la page entière
                      window.location.reload();
                    } catch (e) {
                      console.error("Error logging out:", e);
                    }
                  }}
                  labelStyle={styles.drawerLabel}
                />

                {/* <DrawerItem
                  icon={() => <img src={LogoutIcon} width="38" height="38" />}
                  label={menu.logout}
                  onPress={async () => {
                    try {
                      await Promise.all([
                        props.setToken(null),
                        AsyncStorage.removeItem("userToken"),
                        props.setUser("undefined"),
                        AsyncStorage.removeItem("user"),
                        props.setGender(null),
                        AsyncStorage.removeItem("gender"),
                        props.setAccountType(null),
                        AsyncStorage.removeItem("accountType"),
                        props.setFirstName(null),
                        AsyncStorage.removeItem("firstName"),
                        props.setLastName(null),
                        AsyncStorage.removeItem("lastName"),
                        props.setNickName(null),
                        AsyncStorage.removeItem("nickName"),
                        props.setCity(null),
                        AsyncStorage.removeItem("city"),
                        props.setNativeLanguage(null),
                        AsyncStorage.removeItem("nativeLanguage"),
                        props.setRole(null),
                        AsyncStorage.removeItem("role"),
                        AsyncStorage.removeItem("userProfile"),
                      ]);

                      console.log("Successfully logged out");

                      props.navigation.navigate("Register");
                    } catch (e) {
                      console.error("Error logging out:", e);
                    }
                  }}
                  labelStyle={styles.drawerLabel}
                /> */}

                {/* <DrawerItem
                  icon={() => <img src={LogoutIcon} width="38" height="38" />}
                  label={menu.logout}
                  onPress={() => {
                    props.setToken(null);
                    props.setUser("undefined");
                    props.setGender(null);
                    props.setAccountType(null);
                    props.setFirstName(null);
                    props.setLastName(null);
                    props.setNickName(null);
                    props.setCity(null);
                    props.setNativeLanguage(null);
                    props.setRole(null);
                    localStorage.clear();
                    navigation.navigate("Home"); // Navigation vers HomeScreen
                  }}
                  labelStyle={styles.drawerLabel}
                  // style={{ paddingBottom: "1.5%", marginTop: "10%" }}
                /> */}
              </View>
            </>
          )}
        </DrawerContentScrollView>
      </View>
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerHeader: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerProfilePic: {
    marginRight: 10,
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  drawerItemStyle: {
    marginVertical: 4.5,
  },
});