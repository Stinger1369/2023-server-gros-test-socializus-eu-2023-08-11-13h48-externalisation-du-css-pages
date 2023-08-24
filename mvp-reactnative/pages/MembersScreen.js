import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./Styles/MembersScreenCss"
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import MembersSquare from "../components/MembersSquare";
import { hostname } from "../backendconnect/hostname";

import Settings from "../assets/images/searchOff.svg";
import { Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ager } from "../utils/functionDate.js";

const MembersScreen = ({ }) => {
  const [membersList, setMembersList] = useState([]);
  const [activeButton, setActiveButton] = useState("Members");
  const [searchValue, setSearchValue] = useState("");
  const [skip, setSkip] = useState(0);
  const [chargement, setChargement] = useState(true); // pour arreter le chargement lorsqu'il n'y a pas plus de données
  const limit = 20;

  const navigation = useNavigation()

  useFocusEffect(
    React.useCallback(() => {
    if (!chargement) return;
    
      const fetchData = async () => {
        try {
          var response = await axios.get(
            `${hostname}/api/v1/user/getuserlist?limit=${limit}&skip=${skip}`);

          if (activeButton === "Network") {
            response = `${hostname}/api/v1/user/getnetworklist?limit=${limit}&skip=${skip}`;
          } else if (activeButton === "FriendList") {
            response = `${hostname}/api/v1/user/getfriendlist?limit=${limit}&skip=${skip}`;
          }
          const shuffledData = response.data;
          console.log(shuffledData);

          // shuffledData.sort(() => Math.random() - 0.5); //voir Backend3/controllers/v1/UserControllers.js -> getUserList
          // shuffledData.forEach(user => {
          //   if (user.avatar && user.avatar !== "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"){
          //     tab.push(user);
          //   }
          // });

          if (shuffledData.length === 0) {
            setChargement(false);
          } else {
            setMembersList((prevEvents) => [...prevEvents, ...shuffledData]);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      try {
          fetchData();

        const timer = setInterval(() => {
          setSkip((prevSkip) => prevSkip + limit);
          // console.log("skip lim",skip, limit);
        }, 1500);
      
        return () => {
          clearInterval(timer);
        };
      } catch (error) {
        console.error(error);
      }
  }, [skip, chargement, activeButton]));


  console.log("Members List Length:", membersList.length);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setSkip((prevSkip) => prevSkip + limit);    // Reset skip to 0
    });
    // The cleanup function will run when the component is unmounted
    return unsubscribe;
}, []);

  return (
    <>
      {/* <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Members" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => setActiveButton("Members")}>
          <Text style={styles.text}>Members</Text>
        </TouchableOpacity> */}

        {/* <View style={styles.separator} /> */}

        {/* <TouchableOpacity
          style={[
            styles.button,
            activeButton === "Network" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => {
            setActiveButton("Network");
            navigation.navigate('Network'); 
          }}>
          <Text style={styles.text}>Network</Text>
        </TouchableOpacity> */}

        {/* <View style={styles.separator} /> */}

        {/* <TouchableOpacity
          style={[
            styles.button,
            activeButton === "FriendList" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => {
            setActiveButton("FriendList");
            navigation.navigate('FriendList');
          }}>
          <Text style={styles.text}>FriendList</Text>
        </TouchableOpacity> */}
      {/* </View> */}

      {/* <View style={styles.secondaryMenuContainer}>
        <TouchableOpacity
          style={[
            styles.smallButton,
            activeButton === "Male" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => setActiveButton("Male")}>
          <Image source={Male} style={{ width: 21, height: 21 }} />
        </TouchableOpacity>

        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={[
            styles.smallButton,
            activeButton === "Pros" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => setActiveButton("Pros")}>
          <Text style={styles.smallText}>Pros</Text>
        </TouchableOpacity>

        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={[
            styles.smallButton,
            activeButton === "Female" && { backgroundColor: "#59c09b" },
          ]}
          onPress={() => setActiveButton("Female")}>
          <Image source={Female} style={{ width: 21, height: 21 }} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.searchContainer}>
        {/* <Image source={Settings} style={styles.searchIcon} /> */}
        <Settings style={ styles.settingsContainer } />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here ..."
          placeholderTextColor="#CCCCCC"
          onChangeText={(text) => setSearchValue(text)} // Ajoutez ceci
        />
      </View>

      {membersList.length > 0 && (
        <ScrollView>
          <View style={styles.container}>
            {membersList
              .filter((member) => {
                // if (activeButton === "Male") {
                //   return (
                //     member.sexe === "male" &&
                //     member.isPersonalAccount &&
                //     (!searchValue ||
                //       (member.firstName &&
                //         member.firstName
                //           .toLowerCase()
                //           .includes(searchValue.toLowerCase())))
                //   );
                // }
                // if (activeButton === "Pros") {
                //   return (
                //     !member.isPersonalAccount &&
                //     (!searchValue ||
                //       (member.firstName &&
                //         member.firstName
                //           .toLowerCase()
                //           .includes(searchValue.toLowerCase())))
                //   );
                // }
                // if (activeButton === "Female") {
                //   return (
                //     member.sexe === "female" &&
                //     member.isPersonalAccount &&
                //     (!searchValue ||
                //       (member.firstName &&
                //         member.firstName
                //           .toLowerCase()
                //           .includes(searchValue.toLowerCase())))
                //   );
                // }
                if (searchValue !== "") {
                  return (
                    member.firstName &&
                    member.firstName
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  );
                }
                return true; // cette ligne affichera tous les membres par défaut
              })
              // Ici, nous ajoutons le mélange
              // .sort(() => Math.random() - 0.5)
              .map((member, index) => (
                <View key={index} style={styles.memberCard}>
                  <MembersSquare
                    city={member.city}
                    age={ager(member.birthday)}
                    name={member.firstName}
                    avatar={member.avatar}
                    member={member}
                  />
                </View>
              ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MembersScreen;

