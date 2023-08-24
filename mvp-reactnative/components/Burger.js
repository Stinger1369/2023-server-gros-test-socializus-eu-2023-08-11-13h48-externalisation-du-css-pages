import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import styles from "./Styles/BurgerCss"
//import { useNavigation } from "@react-navigation/native";
import Avatar from "../assets/images/avatar.svg";
import Concept from "../assets/images/concept.svg";
import ContactUs from "../assets/images/contact-us.svg";
import CreateActivity from "../assets/images/create-activity.svg";
import EditProfile from "../assets/images/edit-profile.svg";
import InviteFriends from "../assets/images/invite-friends.svg";
import Logout from "../assets/images/logout.svg";
import Notification from "../assets/images/notifications.svg";
import PastActivities from "../assets/images/past-activities.svg";
import Terms from "../assets/images/terms.svg";
import Update from "../assets/images/update.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Burger = ({navigation, func, setToken, setProfile, user}) => {
  const width = 30;
  const height = 30;

  const datas = [
    {
      key: "Concept",
      img: <Concept width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Edit my Profile",

      img: <EditProfile width={width} height={height} />,
      handlePress: () => {
        
      }
    },
    {
      key: "Create An Activity",
      img: <CreateActivity width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Past Activities",
      img: <PastActivities width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Invite Friends",
      img: <InviteFriends width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Contact Us",
      img: <ContactUs width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Notification",
      img: <Notification width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Update",
      img: <Update width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Terms and Conditions",
      img: <Terms width={width} height={height} />,
      handlePress: () => {

      }
    },
    {
      key: "Logout",
      img: <Logout width={width} height={height} />,
      handlePress: async () => {
        func()
        setToken(null)
        setProfile(null)
        await AsyncStorage.removeItem("userToken")
        await AsyncStorage.removeItem("userProfile")
      }
    },
  ];

  return (
    
    <SafeAreaView style={styles.burger}>
      <View style={styles.headBurger}>
        <View style={styles.profile}>
          <Image
            source={{uri: user.avatar}}
            style={styles.avatar}
          />
          <Text style={styles.nameProfile}>{user.userName}</Text>
        </View>
        <TouchableOpacity onPress={func} style={styles.cross}>
          <Text style={{ color: "#ffffff" }}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <FlatList
          data={datas}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.flex} onPress={item.handlePress}>
                {item.img}
                <Text style={styles.itemText}>{item.key}</Text>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Burger;


