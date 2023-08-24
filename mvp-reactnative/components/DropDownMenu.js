import { View, StyleSheet } from 'react-native';
import styles from "./Styles/DropDownMenuCss"
import SelectList from 'react-native-dropdown-select-list';
import DownArrow from "../assets/images/downward-arrow-2.svg";
import Language from "../assets/images/language.svg";
import { SvgUri } from 'react-native-svg';

const DropDownMenu = ({ selected, setSelected, setIndex, pressed, index, setLanguage, data, flags }) => {
    return <>
        <View style={styles.dropdown}>

            <SelectList
                setSelected={setIndex}
                data={data}
                search={false}
                placeholder=""
                boxStyles={{
                    width: 120, height: 55, borderColor: (!selected && pressed) ? "red" : "black",
                    borderWidth: 1,
                    borderRadius: 15,
                    alignItems: "center"
                }}
                arrowicon={<DownArrow marginTop={5} marginLeft={25} backgroundColor="red" />}
                onSelect={() => {
                    setSelected(true);
                    setLanguage(data[index].value);
                }}
            />
            {selected && <View style={styles.flags}>
                <SvgUri width={31} height={19} uri={index && flags[index].urls[0]} /></View>}
        </View>
    </>;
};


export default DropDownMenu;