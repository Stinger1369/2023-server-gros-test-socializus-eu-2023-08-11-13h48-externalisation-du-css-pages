import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "../Styles/MemberShipScreenCss";
import Json from "../../assets/json/fr.json";

// Importation étoiles jaunes
import coupe1 from "../../assets/images/MemberShip_images/Coupes-02.svg";
import coupe2 from "../../assets/images/MemberShip_images/Coupes-03.svg";
import coupe3 from "../../assets/images/MemberShip_images/Coupes-04.svg";
import coupe4 from "../../assets/images/MemberShip_images/Coupes-05.svg";
import coupe5 from "../../assets/images/MemberShip_images/Coupes-06.svg";
import coupe7 from "../../assets/images/MemberShip_images/Coupes-07.svg";

//import MemberShipPremium from './MemberShipPremium';

import { useNavigation } from "@react-navigation/native";
const MemberShipScreen = () => {
  const navigation = useNavigation(); // Get the navigation object
  const { member } = Json;
  const Separator = () => {
    return <View style={styles.separator} />;
  };
  const SeparatorPlat = () => {
    return <View style={styles.separatorPlat} />;
  };
  const SeparatorNoir = () => {
    return <View style={styles.SeparatorNoir} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowText}>
        <Text style={styles.text}>{member.textL1}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Image source={coupe1} style={styles.img} />
          <View style={styles.cardContent}>
            {/**  "textNum1":"1000",
            "textPoint":" points", */}
            <Text style={styles.textCard}>
              {member.textNum1}
              {member.textPoint}
            </Text>
            <Text style={styles.textCard}>{member.textBronze}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image source={coupe2} style={styles.img} />
          <View style={styles.cardContent}>
            <Text style={styles.textCard}>
              {member.textNum1}
              {member.textPoint}
            </Text>
            <Text style={styles.textCard}>{member.textSilver}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image source={coupe3} style={styles.img} />
          <View style={styles.cardContent}>
            <Text style={styles.textCard}>
              {member.textNum3}
              {member.textPoint}
            </Text>
            <Text style={styles.textCard}>{member.textGold}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <Image source={coupe4} style={styles.img} />
          <View style={styles.cardContent}>
            <Text style={styles.textCard}>
              {member.textNum4}
              {member.textPoint}
            </Text>
            <Text style={styles.textCard}>{member.textEmrald}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image source={coupe5} style={styles.img} />
          <View style={styles.cardContent}>
            <Text style={styles.textCard}>
              {member.textNum5}
              {member.textPoint}
            </Text>
            <Text style={styles.textCard}>{member.textRuby}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image source={coupe7} style={styles.img} />
          <View style={styles.cardContent}>
            <Text style={styles.textCard}>
              {member.textNum6}
              {member.textPoint}
            </Text>
            <Text style={styles.textCard}>{member.textGold}</Text>
          </View>
        </View>
      </View>
      {/**Notre boutton  */}
      <View style={styles.cardButton}>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => navigation.navigate('MemberShipPremium')}
        >
          <Text style={styles.buttonText}>{member.textSubmit}</Text>
        </TouchableOpacity>
        {/**notre texte en bas du taableau qui vaas s'afficher */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>How do I get more points?</Text>
        </View>
      </View>
      {/**notre tablau */}
      <View style={styles.table}>
        <View style={styles.rowTab}>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{member.textL3}</Text>
          </View>
          <Separator />
          <View style={styles.cell}>
            <Text style={styles.cellText}>{member.textL4}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{member.textPointS}</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellText}>{member.textNbrePoint}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>{member.textL6}</Text>
          </View>
          <SeparatorNoir />
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>2</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>5</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>20</Text>
          </View>
        </View>
        <SeparatorPlat />
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>{member.textL7}</Text>
          </View>
          <SeparatorNoir />
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>6</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>20</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>100</Text>
          </View>
        </View>
        <SeparatorPlat />
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>{member.textL8}</Text>
          </View>
          <SeparatorNoir />
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>4</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>50</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>1200</Text>
          </View>
        </View>
        <SeparatorPlat />
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>{member.textL9}</Text>
          </View>
          <SeparatorNoir />
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>2</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>300</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>1000</Text>
          </View>
        </View>
        <SeparatorPlat />
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>{member.textL10}</Text>
          </View>
          <SeparatorNoir />
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>1</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>200</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>100</Text>
          </View>
        </View>
        <SeparatorPlat />
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>{member.textL11}</Text>
          </View>
          <SeparatorNoir />
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>0</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>100</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellTextCentre}>0</Text>
          </View>
        </View>
        <SeparatorPlat />
      </View>
    </View>
  );
};

export default MemberShipScreen;
