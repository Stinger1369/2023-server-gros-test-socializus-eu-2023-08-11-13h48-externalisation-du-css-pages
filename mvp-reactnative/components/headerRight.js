import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import {Icon} from "@rneui/themed";

const HeaderRight = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        setCardType(!cardType);
      }}
    >
      {cardType ? (
        <Icon name="search-plus" type="font-awesome" size={26} color="white" />
      ) : (
        <Icon name="search-minus" type="font-awesome" size={26} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default HeaderRight;
