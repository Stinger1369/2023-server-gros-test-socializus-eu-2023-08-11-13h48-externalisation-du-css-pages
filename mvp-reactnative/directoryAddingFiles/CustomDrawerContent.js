//🇫🇷 Barre de navigation du menu (Frame Figma 100)
//🇬🇧 Menu drawer navigation (Frame Figma 100)
import React, {useEffect} from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
//Assets images
import CreateActivity from "../assets/images/create-activity.svg";

import Settings from "../assets/images/setting1.svg";

import Json from "../assets/json/en.json";
import ExampleCup from "../assets/user-grades-and-sponsorship/GoldCup_Gold_noStar.svg";

import InfoIcon from "../assets/drawer-icons/info.svg";
import UserProfilePicture from "../assets/drawer-icons/userProfilePicture.svg";
import GoldenStarIcon from "../assets/drawer-icons/goldenStar.svg";
import InviteFriendsIcon from "../assets/drawer-icons/inviteFriends.svg";
import SettingsIcon from "../assets/settings-icons/settingsGears.svg";
import UpdateIcon from "../assets/drawer-icons/update.svg";
import QrCodeIcon from "../assets/drawer-icons/qrCode.svg";
import LogoutIcon from "../assets/drawer-icons/logout.svg";
import userguy from "../assets/images/image_edit_profile/userguy.svg"
import usergirl from "../assets/images/image_edit_profile/usergirl.svg"
import { Icon } from "@rneui/themed";
// import styles from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawerContent = (props) => {
  const { menu } = props.scr;
  //text
  //console.log("avatar :", props.user.avatar);
  //console.log("userName :", props.user.userName);
  
  //🇫🇷  declaration d'une url d'image
  //🇬🇧 declaration of an image url
  

  const text = "Username";
  var image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  //end text
  useEffect(()=>{
    if(props.user != null){
      image = props.user.sexe === "male" ? userguy : usergirl;
    }
  },[])
  const clearAllData = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/*Style the image */}
        <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
        {/*Croix pour fermer le menu */}
        {/*Icon for closing menu */}
        <View style={{alignSelf: "flex-end", borderRadius: 50, borderWidth: 1, }}>
          <Icon name="close" size={30} color="black" onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}/>
        </View>
        {/* Début du header du menu burger */}
        {/* The menu content header */}
        <View style={styles.drawerHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: props.user?.avatar || image }} style={styles.headerProfilePic}/>
              <Text style={styles.drawerLabel}>
                {props.user?.userName || text}
              </Text>
            </View>
            {/* Voir dans la BDD si le user détient un trophée ou non */}
            {/* Check in back-end if the user has a trophy */}
            <ExampleCup style={{ marginLeft: 30 }} />
          </View>
        </View>

        {/* Début du corps du menu burger */}
        {/* Menu content body */}
        <View style={{ backgroundColor: "#fff" }}>

          {/* Concept */}
          <DrawerItem
            icon={() => <InfoIcon width="38" height="38"  />}
            label={menu.concept}
            onPress={() => {
              props.navigation.navigate("Concept");
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* Profil */}
          <DrawerItem
            icon={() => <UserProfilePicture width="38" height="38"  />}
            label={menu.me}
            onPress={() => {
              props.navigation.navigate("My Profile");
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* Créer une activité */}
          <DrawerItem
            icon={() => <CreateActivity width="38" height="38"  />}
            label={menu.create}
            onPress={() => props.navigation.navigate("Create Activity")}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* Inviter des amis */}
          <DrawerItem
            icon={() => <InviteFriendsIcon width="38" height="38"  />}
            label={menu.invite}
            onPress={() => {
              props.navigation.navigate("Invite Friends");
              props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* VIP */}
          <DrawerItem
            icon={() => <GoldenStarIcon width="38" height="38"  />}
            label={menu.vip}
            onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* Settings */}
          <DrawerItem
            icon={() => <SettingsIcon width="38" height="38"  />}
            label={menu.settings}
            onPress={() => {
              props.navigation.navigate("Settings");
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* Update */}
          <DrawerItem
            icon={() => <UpdateIcon width="38" height="38"  />}
            label={menu.update}
            onPress={() => {
              props.navigation.navigate("Update");
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* QR code */}
          <DrawerItem
            icon={() => <QrCodeIcon width="34" height="34" />}
            label={menu.qrcode}
            onPress={() => {
              props.navigation.navigate("QR Code");
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }}
            labelStyle={styles.drawerLabel}
            style={styles.drawerItemStyle}
          />

          {/* Logout */}
          <DrawerItem
            icon={() => <LogoutIcon width="38" height="38"  />}
            label={menu.logout}
            onPress={() => {
              props.setToken(null), props.setUser('undefined'),
              props.setGender(null), props.setAccountType(null),
              props.setFirstName(null), props.setLastName(null),
              props.setNickName(null), props.setCity(null),
              props.setNativeLanguage(null), props.setRole(null)
              clearAllData()
            }}
            labelStyle={styles.drawerLabel}
            // style={{ paddingBottom: "1.5%", marginTop: "10%" }}
          />
        </View>

      </DrawerContentScrollView>
    </View>
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