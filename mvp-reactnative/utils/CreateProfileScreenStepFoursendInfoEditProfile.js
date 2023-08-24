
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendInfoEditProfile = async (avatarImage, image, userToken, hostname, profilData, user, UpdateData, setUser) => {
    const editProfilBody = {
      image : avatarImage === null ? image : avatarImage,
      avatar : avatarImage === null ? image : avatarImage,
    };
    let res = JSON.parse(await AsyncStorage.getItem("id"));
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(editProfilBody),
      };
      const response = await fetch(
        `${hostname}/api/v1/user/info/${res._id}`,
        requestOptions
      );
      const data = await response.json();
      Object.assign(user, editProfilBody);
      UpdateData();
      setUser(user);
    } catch (error) {
      console.log("CATCH :", error);
    }
};


