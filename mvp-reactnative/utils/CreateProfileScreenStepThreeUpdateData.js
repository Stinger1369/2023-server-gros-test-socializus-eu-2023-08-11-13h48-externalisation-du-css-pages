
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateData = async (setProfilData, hostname) => {
    try {
      let res = JSON.parse(await AsyncStorage.getItem("id"));
      setProfilData(res);
      const response = await axios.get(
        `${hostname}/api/v1/user/getuserinfo/${res._id}`
      );
      const resultat = JSON.stringify(response.data.user);
      await AsyncStorage.setItem("Profile", resultat);
      await AsyncStorage.setItem("user", resultat);
    } catch (error) {
      console.error(error);
    }
};
