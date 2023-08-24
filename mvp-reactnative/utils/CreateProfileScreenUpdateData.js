
import axios from 'axios';
import { hostname } from "../backendconnect/hostname";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateData = async (userToken, setProfilData, profile) => {
  if(profile === true){
    try {
      const response = await axios.post(
        `${hostname}/api/v1/user/get-user-by-token`,
        { userToken }
      );
      console.log(response.data + "----------avec updateData");
      const userData = JSON.stringify(response.data.user);
      setProfilData(JSON.parse(userData));
      await AsyncStorage.setItem("Profile", userData);
      await AsyncStorage.setItem("user", userData);
      await AsyncStorage.setItem("id", userData);
      console.log(JSON.parse(userData));
      console.log(JSON.parse(await AsyncStorage.getItem("user")));
    } catch (error) {
      console.error(error);
    }
  }
};
