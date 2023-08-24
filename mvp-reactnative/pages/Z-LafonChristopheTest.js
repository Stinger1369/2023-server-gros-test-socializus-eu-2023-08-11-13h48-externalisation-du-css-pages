import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
//(FR) Méthode permettant de faire la redirection vers le page EditProfile
//(EN) Method to redirect to the EditProfile page
const RedirectScreen = () => {
  const navigation = useNavigation();
  return (
    <Button title="text" onPress={() => navigation.navigate("EditProfile")} />
  );
};
export default RedirectScreen;
