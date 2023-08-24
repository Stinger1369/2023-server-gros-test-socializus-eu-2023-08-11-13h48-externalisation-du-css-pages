import { View, StyleSheet } from 'react-native';
import styles from "./Styles/SelectLanguageCss"
import SelectList from 'react-native-dropdown-select-list';
import DownArrow from "../assets/images/downward-arrow-2.svg";
import Language from "../assets/images/language.svg";
import { SvgUri } from 'react-native-svg';
import { countriesListRectFlags } from '../assets/countriesListRectFlags';

const SelectLanguage = ({ selected, setSelected, setIndex, pressed, index, setLanguage, data, flags }) => {
    console.log(countriesListRectFlags[0])
    console.log(countriesListRectFlags[1].flag)
    let Ima=countriesListRectFlags[0].flag
    console.log("tshshs",data[index])
    console.log(data)
    return <>
        <SelectList
            setSelected={setIndex}
            data={data}
            search={false}
            placeholder={"Select your language"}
            boxStyles={{
                width: 319, height: 51, paddingLeft: 50, borderColor: (!selected && pressed) ? "red" : "black",
                borderWidth: 1,
                borderRadius: 15,
            }}
            arrowicon={<DownArrow marginTop={5} marginLeft={25} />}
            onSelect={() => {
                setSelected(true);
                setLanguage(data[index].value);
            }}
        />
        <View style={styles.emote}><Language width={30} height={30} />
        </View>
        {selected && <View style={styles.flags}>{countriesListRectFlags[index].flag}</View>}
    </>;
};


export default SelectLanguage;
