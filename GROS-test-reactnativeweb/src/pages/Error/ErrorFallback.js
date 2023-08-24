import { Text, View, Image, ImageBackground } from "react-native";
import { Button } from "@rneui/base";
import Json from "../../assets/json/en.json";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ErrorFallback = ({ error, resetErrorBoundary, props }) => {
  const handleRefresh = () => {
    resetErrorBoundary();
    // Perform any necessary actions to refresh the app
  };
  // const errorMessage = Json.errorPage;
  const [user, setUser] = useState({});
  const [scr, setScr] = useState(Json); ///
  const errorPage = Json.errorPage;
  const menu = Json.menu;

  //garde la langue selected en session
  let x = scr;
  if (sessionStorage.keyy != null) {
    x = JSON.parse(sessionStorage.getItem("keyy"));
  } else {
    x = scr;
  }

  // console.log("ErrorFallback::keyy for langage", x);

  useEffect(() => {
    // console.log("ErrorFallback::useEffect::A");
    AsyncStorage.getItem("user").then((suser) => {
      // console.log("ErrorFallback::useEffect::B");
      if (suser != "undefined") {
        setUser(JSON.parse(suser));
        // console.log("ErrorFallback::useEffect::C", user, JSON.parse(suser));
        // console.log(suser);
      } else {
        //
      }
    });
  }, []);

  const styles = {
    errorMessageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
      marginHorizontal: 30,
    },
    errorMessage: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: 20,
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
    },
    afraidEmoji: {
      marginTop: 10,
    },
  };

  return (
    <View style={styles.errorMessageContainer}>
      <View style={{ backgroundColor: "blue", width: "55%", height: 180 }}>
        <ImageBackground
          source={require("../../assets/images/afraidEmoji.jpg")}
          resizeMode={"cover"}
          style={{ flex: 1, padding: 10 }}
        ></ImageBackground>
      </View>
      <Text style={styles.errorMessage}>{x.errorPage.errorMessage}</Text>

      <Button
        title={x.errorPage.buttonLabel}
        onPress={handleRefresh}
        style={styles.button}
      />

      <Button
        title={x.menu.logout}
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
        style={styles.button}
      />
    </View>
  );
};

export default ErrorFallback;
