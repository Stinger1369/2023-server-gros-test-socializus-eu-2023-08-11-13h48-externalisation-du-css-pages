//🇫🇷 Selectionner la language de l'app ( Frame Figma : 2A - 2B - 2C )
//🇬🇧 Select the app language ( Frame Figma : 2A - 2B - 2C)

import { View, Image } from "react-native";
import styles from "./Styles/SelectLanguageCss";
import { SelectList } from "react-native-dropdown-select-list";
import DownArrow from "../assets/images/downward-arrow-2.svg";
import Language from "../assets/images/language.svg";
import { SvgUri } from "react-native-svg";

const SelectLanguage = ({
  selected,
  setSelected,
  setIndex,
  pressed,
  index,
  setLanguage,
  data,
  flags,
  placeholder,
}) => {
  return (
    <>
      <SelectList
        setSelected={setIndex}
        data={data}
        search={false}
        placeholder={placeholder}
        boxStyles={{
          width: 395,
          height: 45,
          paddingLeft: 50,
          borderColor: !selected && pressed ? "red" : "black",
          borderWidth: 1,
          borderRadius: 15,
        }}
        arrowicon={
          <Image source={DownArrow} style={ styles.downArrowStyle } />
        }
        onSelect={() => {
          setSelected(true);
          setLanguage(data[index].value);
        }}
      />
      <View style={styles.emote}>
        <Image source={Language} style={ styles.languageImgStyle } />
      </View>
      {selected && (
        <View style={styles.flags}>
          <Image
            style={ styles.flagsStyle }
            source={index && flags.data[index].value}
          />
        </View>
      )}
    </>
  );
};
export default SelectLanguage;
