//🇫🇷 Page de profil - onglet Amis (Figma Frame 72)
//🇬🇧 Profile Page - Friends tab (Figma Frame 72)

import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles/ProfileFriendsCss";
import { CheckBox } from "@rneui/base";
import React, { useState } from "react";
// import { color, RollInRight } from "react-native-reanimated";
import Previous from "../../assets/images/previous-black.svg";
// import Remove from "../assets/images/removeBtn.png";
// import Star from "../assets/images/star.svg";

const ProfileFriends = () => {
  const [check, setCheck] = useState(false); //🇫🇷 Checkbox pour rendre la liste publique ou privée

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/*<View style={styles.content}>
          <View style={styles.div}>
            <Image style={{ width: "100%", height: 300 }} source={require("../assets/images/bellefemme.png")}/>

            <View style={styles.containerInfo}>
              <View style={styles.pourcentageInfo}>
                <Text style={{ fontSize: 15, color: "black", fontWeight: "600" }}>Organizer:</Text>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Star width={20} height={20} />
                    <Star width={20} height={20} />
                    <Star width={20} height={20} />
                    <Star width={20} height={20} />
                  </View>
                </View>

                <View style={styles.pourcentageInfo2}>
                  <Text style={[styles.font, { fontSize: 15 }]}>
                    Reliability :
                  </Text>
                </View>

                <View style={styles.pourcentageBar}>
                  <View style={styles.positivBar}></View>
                  <View style={styles.negativBar}></View>
                </View>
              </View>
              <View style={styles.actionProfile}>
                <View style={styles.infoText}>
                  <Text style={styles.userPseudo}>Astrid L.</Text>
                  <Text style={styles.userAge}>28 Years</Text>
                  <Text style={styles.userPoint}>Paris</Text>
                </View>
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
            </View>
          </View>
        </View>*/}
        {/* 1st div : the title "Your Knowledge", checkbox and make "See all" btn working */}
        <View style={styles.networkInfo}>
          <View style={styles.networkTitle}>
            <View>
              <Text style={{ marginTop: "14%", fontWeight: "700" }}>
                Your network:
                <Text style={ styles.nbrTxt }>
                  122
                </Text>
              </Text>
              <Text style={{ fontStyle: "italic" }}>(Members met)</Text>
            </View>
            <CheckBox
              containerStyle={styles.checkbox}
              title="Public"
              checked={check}
              checkedColor="#59c09b"
              onPress={() => setCheck(!check)}
            />
            <TouchableOpacity style={styles.publicBtn}>
              <Text style={styles.seeText}>See all</Text>
            </TouchableOpacity>
          </View>
          {/* End 1st div*/}

          {/* 2nd div : make a component of this <View> for the backend (actually just brut code), this part is for the members card in Frame 19C of the figma, need to change all the text by the user infos  */}
          <View style={styles.cardContainer}>
            <View style={styles.networkCard}>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}> Jean-Paul Imhoff </Text>
              <Text style={styles.userStatut}>Owner</Text>
              <TouchableOpacity style={styles.crossBtn}></TouchableOpacity>
            </View>
            <View style={styles.networkCard}>
              <Image
                style={styles.userAvatar}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}> Jean-Paul Imhoff </Text>
              <Text style={styles.userStatut}>Owner</Text>
              <TouchableOpacity style={styles.crossBtn}></TouchableOpacity>
            </View>
            <View style={styles.networkCard}>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}> Jean-Paul Imhoff </Text>
              <Text style={styles.userStatut}>Owner</Text>
              <TouchableOpacity style={styles.crossBtn}></TouchableOpacity>
            </View>
          </View>
          {/* End 2nd div*/}

          {/* Previous Button : make it fonctionnal to see all the members we met */}
          <View>
            <TouchableOpacity>
              <Image source={Previous} style={styles.previousRight} />
            </TouchableOpacity>
            <TouchableOpacity>
              <img src={Previous} style={styles.previousLeft} />
            </TouchableOpacity>
          </View>
          {/* End previous btn */}
        </View>

        {/* 3rd div : User Liked title and menu , make see all button working*/}
        <View style={styles.likedBigContainer}>
          <View style={styles.title}>
            <Text style={{ fontStyle: "italic" }}>(Private list)</Text>
            <Text style={{ fontWeight: "700" }}>
              User Liked:
              <Text style={ styles.nbrTxt }>
                12
              </Text>
            </Text>
            <TouchableOpacity style={styles.publicBtn}>
              <Text style={styles.seeText}>See all</Text>
            </TouchableOpacity>
          </View>
          {/* End 3rd div */}
          {/* 4th div : make it fonctionnal in back, you can use this <View> too display all the user we liked */}

          <View style={styles.likedContainer}>
            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>

            {/* End 4th div */}

            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>
          </View>

          <View style={styles.likedContainer}>
            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>

            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>
          </View>
        </View>

        {/* 5th div : Friends menu */}
        <View style={styles.friends}>
          <View style={[styles.title, { marginTop: "-4%" }]}>
            <Text style={{ fontStyle: "italic" }}>(Private list)</Text>
            <Text style={{ fontWeight: "700" }}>
              Friends:
              <Text style={ styles.nbrTxt }>
                12
              </Text>
            </Text>
            <TouchableOpacity style={styles.publicBtn}>
              <Text style={styles.seeText}>See all</Text>
            </TouchableOpacity>
          </View>
          {/* End 5th div */}

          {/* 6th div : use the same user design component as before for this*/}
          <View style={styles.friendContainer}>
            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>
            {/* End 6th div*/}

            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>
          </View>
          <View style={styles.friendContainer}>
            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>
            <View style={styles.userLiked}>
              <TouchableOpacity style={styles.removeBtn}></TouchableOpacity>
              <Image
                style={styles.avatarLiked}
                source={require("../../assets/images/randomUser.png")}
              />
              <Text style={styles.userName}>Karan Sandhu</Text>
            </View>
          </View>
          <View style={styles.friendContainer}></View>
        </View>

        {/* 7th div : Blocked User menu */}
        <View style={styles.blocked}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileFriends;
