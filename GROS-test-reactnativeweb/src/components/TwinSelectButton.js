//🇫🇷 Affichage du bouton twinselect (Frame 15 - 60 sur Figma)
//🇬🇧 Display of twin select button (Frame 15 - 60 of Figma)

import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./Styles/TwinSelectButtonCss";
// import Male from "../assets/images/male.svg";
// import Female from "../assets/images/female.svg";

const TwinSelectButton = ({
  firstTitle,
  secondTitle,
  profileState,
  setIsSelect,
  setActive,
  setSecondActive,
  active,
  secondActive,
  scr,
}) => {
  const component = (positionBtn, title) => {
    return (
      <TouchableOpacity
        style={[
          styles[positionBtn],
          {
            backgroundColor:
              positionBtn === "firstBtn"
                ? active
                  ? "#ACE0CD"
                  : "white"
                : positionBtn === "secondBtn" && secondActive
                ? "#ACE0CD"
                : "white",
          },
          {
            justifyContent:
              title === "Male" || title === "Female" ? null : "center",
          },
        ]}
        onPress={() => {
          const { setGender, setAccountType } = profileState;
          setIsSelect(true);
          if (positionBtn === "firstBtn") {
            setSecondActive(false);
            setActive(true);
            if (title === scr.createProfile.male) {
              setGender("male");
            } else {
              setAccountType(title);
            }
          } else {
            setSecondActive(true);
            setActive(false);
            console.log(title);
            console.log(scr);
            if (title === scr.createProfile.female) {
              setGender("female");
            } else {
              setAccountType(title);
            }
          }
        }}
      >
        {title === "Male" ? (
          <View style={styles.logo}>
            <Image
              source={require("../assets/images/male.png")}
              style={{ width: 25, height: 25 }}
            />
          </View>
        ) : (
          title === "Female" && (
            <View style={styles.logo}>
              <Image
                source={require("../assets/images/female.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
          )
        )}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.btnContainer}>
      {component("firstBtn", firstTitle)}
      {component("secondBtn", secondTitle)}
    </View>
  );
};

export default TwinSelectButton;
