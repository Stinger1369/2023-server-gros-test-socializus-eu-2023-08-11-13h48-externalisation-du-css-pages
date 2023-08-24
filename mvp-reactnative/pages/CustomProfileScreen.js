import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import styles from "./Styles/CustomProfileScreenCss"
import React from "react";
import TopNavigation from "../Navigation/TopNavigation";

const CustomProfileScreen = ({ arg }) => {
  return (
    <View style={{ backgroundColor: "red" }}>
      <ScrollView>
        <View style={[styles.container, { backgroundColor: "red" }]}>
          <ImageBackground source={require("../assets/images/mousses.png")} style={styles.profilePhoto}/>
        </View>

        <View style={styles.actionProfile}>
          <View style={styles.infoText}>
            <Text style={styles.userPseudo}>Karen J.</Text>
            <Text style={styles.userAge}>21 Years</Text>
            <Text style={styles.userPoint}>435 Points</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.addFriend}>
              <Text>Add Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.chat}>
              <Text>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.block}>
              <Text style={{ color: "white" }}>Block</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TopNavigation arg={arg} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomProfileScreen;


