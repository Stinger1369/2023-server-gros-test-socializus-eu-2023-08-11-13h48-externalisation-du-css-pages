//🇫🇷 Page d'informations (à propos de nous) (Figma Frame 91)
//🇬🇧 News page (Figma Frame 91)

import {
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import styles from "./Styles/ParrainageCss";
//importaation étoite jaune 1
import Coupe1 from "../assets/images/Coupe1.svg";
import Coupe2 from "../assets/images/Coupe3.svg";
import Coupe3 from "../assets/images/Coupe41.svg";
import Coupe41 from "../assets/images/Coupe2.svg";
//importaation d'image cadeai
import cadeau from "../assets/images/cadeau.svg";
//importaation d'image ccopy
import file_copy from "../assets/images/file_copy.svg";
//🇫🇷 L'image du haut et les icônes sont manquantes
//🇬🇧 The top picture and the three icons are missing
import Json from "../assets/json/fr.json";
const Parrainage = () => {
  const { parrainage } = Json;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.centrePrincipale}>
          <View>
            <Text style={styles.headerText}>
              {/**  "textL1":"Obtiens gratuitement",
                "textL2":"des packs VIP en parrainant tes amis"**/}
              <Text style={styles.boldText}>
                {parrainage.textL1}
                {"\n"}
              </Text>{" "}
              {parrainage.textL2}
            </Text>
          </View>
          {/**Mon code parin en test */}
          <View style={styles.imageCado}>
            <Image
              source={cadeau}
              style={[styles.imgCadeau, { width: 150, height: 150 }]}
            />
          </View>

          <View style={styles.texteCode}>
            {/*code par= code parrrain et num égale 68OHAA: 0/}
                    <Text style={styles.boldText}>{parrainage.codePar}{parrainage.num}</Text>
                    {/**Notre image copier  document  */}
            <Image
              source={file_copy}
              style={[styles.img, { width: 16, height: 16 }]}
            />
          </View>
          <View style={styles.borderParrain}>
            <Text style={styles.nombreParrain}>
              {parrainage.textNum5}
              {parrainage.textNum0}
            </Text>
          </View>
        </View>

        <View style={styles.centrePrincipale4}>
          <View style={styles.numberContainerEtPartage}>
            <View style={styles.numberContainer}>
              <Text style={styles.largeNumber}>{parrainage.textNum1}</Text>
            </View>
            <View>
              <Text style={styles.centreText3}>{parrainage.part1}</Text>
            </View>
          </View>
          {/**Parrtager le code  */}
          <TouchableOpacity>
            <View>
              <Text style={styles.centreText6}>{parrainage.part2}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.centrePrincipale3}>
          <View style={styles.numberContainer}>
            <Text style={styles.largeNumber}>2</Text>
          </View>
          <Text style={styles.centreText3}>{parrainage.textL3}</Text>
        </View>

        <View style={styles.centrePrincipale3}>
          <View style={styles.numberContainer}>
            <Text style={styles.largeNumber}>{parrainage.textNum3}</Text>
          </View>
          <Text style={styles.centreText3}>{parrainage.textL4} </Text>
        </View>

        <Text style={styles.headerText1}>
          <Text style={styles.boldText}>{parrainage.textL5}</Text>
        </Text>

        <View style={styles.dividerLine} />

        {/* Ajout des carrés */}
        <View style={styles.squareContainer}>
          <View style={styles.squareRow}>
            <View style={styles.square}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText1}>Gold Star</Text>
                <Image
                  source={Coupe1}
                  style={[
                    styles.img,
                    {
                      width: 96,
                      height: 96,
                      marginTop: -35,
                      marginBottom: -20,
                    },
                  ]}
                />

                <Text style={styles.squareText5}>
                  <Text style={styles.squareText5}>22 parrainages{"\n"}</Text>{" "}
                  missing
                </Text>
              </View>
            </View>

            <View style={styles.square}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText2}>{parrainage.textL6}</Text>
                <Image
                  source={Coupe2}
                  style={[
                    styles.img,
                    {
                      width: 96,
                      height: 96,
                      marginTop: -35,
                      marginBottom: -20,
                    },
                  ]}
                />
                <Text style={styles.squareText5}>
                  {parrainage.textNum6}
                  {parrainage.textNum9}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.squareRow}>
            <View style={styles.square}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText3}>{parrainage.textL8}</Text>
                <Image
                  source={Coupe3}
                  style={[
                    styles.img,
                    {
                      width: 96,
                      height: 96,
                      marginTop: -35,
                      marginBottom: -20,
                    },
                  ]}
                />
                <Text style={styles.squareText5}>
                  {parrainage.textNum7}
                  {parrainage.textNum9}
                </Text>
              </View>
            </View>

            <View style={styles.square}>
              <View style={styles.squareContent}>
                <Text style={styles.squareText4}>{parrainage.textL9}</Text>
                <Image
                  source={Coupe41}
                  style={[
                    styles.img,
                    {
                      width: 96,
                      height: 96,
                      marginTop: -35,
                      marginBottom: -20,
                    },
                  ]}
                />
                <Text style={styles.squareText5}>
                  {parrainage.textNum8}
                  {parrainage.textNum9}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Parrainage;
