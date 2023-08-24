//🇫🇷 Page de reglages (Figma Frame 101)
//🇬🇧 Settings page (Figma Frame 101)
//🇫🇷 La page est encore incomplète. Il manque les liens.
//🇬🇧 The page is currently unfinished. The links are missing.
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity,} from "react-native";
import styles from "./Styles/SettingsScreenCss"
import JSON from "../assets/json/en.json";
import { useNavigation } from "@react-navigation/native";
import LogButton from "../components/LogButtons";
//🇫🇷 import des images se trouvant dans assets/images
//🇬🇧 import images from assets/images
import SettingGear from "../assets/images/settingGear.svg";
import BlockedUser from "../assets/settings-icons/blockedUser.svg";
import ClosedGift from "../assets/settings-icons/closedGift.svg";
import ContactUs from "../assets/settings-icons/contactUs.svg";
import DeleteAccount from "../assets/settings-icons/deleteAccount.svg";
import EditProfile from "../assets/settings-icons/editProfile.svg";
import LegalNotice from "../assets/settings-icons/legalNotice.svg";
import LikedUsers from "../assets/settings-icons/likedUsers.svg";
import Newspaper from "../assets/settings-icons/newspaper.svg";
import NotificationBell from "../assets/settings-icons/notificationBell.svg";
import PrivacyPolicy from "../assets/settings-icons/privacyPolicy.svg";
import Medals from "../assets/settings-icons/medal 12.svg";
import TermsOfSales from "../assets/settings-icons/term of sale.svg";

import { Icon } from "@rneui/themed";
//🇫🇷 Extraction de l'objet b2022_settings dans en.json
//🇫🇷 Extracting b2022_settings object from en.json
const { b2022_settings } = JSON;

const SettingsScreen = () => {
  // const [step, setStep] = useState(1);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.settingImage}>
          <SettingGear width={50} height={50} style={styles.SettingGearView1} />
          <SettingGear width={75} height={75} style={styles.SettingGearView2}/>
        </View>
        <View style={styles.settingsList}>
          {/*🇫🇷 Ici, importez les différentes images (elles ne sont pas toutes là,
           il faut que le designer les ajoute dans le drive) et mettez-les à
            la place du Text "Image", dupliquez le TouchableOpacity jusqu'à obtenir
            12 boutons et changez "Setting" par les bons textes */}
          {/*🇬🇧 Here, import the different images (not all of them are here,
            the designer has to add them to the Google Drive first) and add
            them instead of the "Image" Text, duplicate the TouchableOpacity
            until you get 12 buttons and change "Settings" with the right text */}
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <BlockedUser />
              {/* 
                  FR la variable json b2022_settings.b2022_blockedUser de en.json permet de bloquée un utilisateur 
                  GB the json variable b2022_settings.b2022_blockedUser of en.json allows you to block a user
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_blockedUser}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <LikedUsers />
              {/* 
                  FR la varible json b2022_settings.b2022_likedUser de en.json permet de liker un utilisateur 
                  GB the json variable b2022_settings.b2022_likedUser of en.json allows to like a user
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_likedUser}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <EditProfile />
              {/* 
                  FR la varibale json b2022_settings.b2022_editProfile permet d'éditer le profil utilisateur
                  GB the json variable b2022_settings.b2022_editProfile allows to edit the user profile
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_editProfile}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <Medals />
              {/*
                  FR la variable json b2022_settings.b2022_medal de en.json permet de voir le nombre de medailles obtenue  
                  GB the json variable b2022_settings.b2022_medal of en.json allows you to see the number of medals obtained
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_medal}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <ClosedGift width={40} height={40} />
              {/*
                  FR la variable json b2022_settings.b2022_sponsorship de en.json permet de configurer les différents sponsor
                  GB the json variable b2022_settings.b2022_sponsorship of en.json allows you to configure the different sponsors
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_sponsorship}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <NotificationBell />
              {/* 
                  FR la variable json b2022_settings.b2022_notification de json permet de configurer les notifications
                  GB the json variable b2022_settings.b2022_notification of json allows to configure the notifications 
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_notification}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}
          onPress={()=>navigation.push("Contact Us")}>
            <View style={styles.row}>
              <ContactUs />
              {/*
                  FR la variable json b2022_settings.b2022_contact de configurer les différents contacts de la liste du profil 
                  GB the json variable b2022_settings.b2022_contact to configure the different contacts of the profile list 
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_contact}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}
            onPress={()=>navigation.push("News")}>
            <View style={styles.row}>
              <Newspaper />
              {/*
                    FR  la variable json b2022_settings.b2022_news de en.json permet de congfigurer le news à voir
                    GB  the json variable b2022_settings.b2022_news of en.json allows you to configure the news to see 
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_news}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <DeleteAccount />
              {/*
                  FR la varible b2022_settings.b2022_deleteAccount de en.json permet de supprimer le compte utilisateur
                  GB the variable b2022_settings.b2022_deleteAccount of en.json allows to delete the user account 
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_deleteAccount}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <LegalNotice />
              {/*
                  FR la variable json b2022_settings.b2022_legalNotice de en.json permet d'accéder à la mention légale 
                  GB the json variable b2022_settings.b2022_legalNotice of en.json allows access to the legal notice
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_legalNotice}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <PrivacyPolicy />
              {/*
                 FR la variable b2022_settings.b2022_privacy de en.json permet d'accéder à la politique de confidentialité 
                 GB the b2022_settings.b2022_privacy variable from en.json provides access to the privacy policy
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_privacy}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <View style={styles.row}>
              <TermsOfSales width={40} height={40} />
              {/*
                   FR la variable json b2022_settings.b2022_TOS de json permet d'accéder aux conditions de ventes  
                   GB the json variable b2022_settings.b2022_TOS of json allows access to the terms of sales
              */}
              <Text style={styles.settingText}>{b2022_settings.b2022_TOS}</Text>
            </View>
            <View>
              <Icon name="chevron-thin-right" type="entypo" size={26} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

