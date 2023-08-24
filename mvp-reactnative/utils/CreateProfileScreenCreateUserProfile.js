
// //(FR) Fonction permettant de mettre à jour les données enrégistrer par l'utilisateur
// //(En) Function who permit to update the data register by the user

import axios from 'axios';

export const CreateUserProfile = async (image, userNativeLanguage, role, hostname, name, userToken, setUser, setProfile) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("sexe", "male");
    formData.append("isPersonalAccount", true);
    formData.append("firstName", null);
    formData.append("lastName", null);
    formData.append("userName", null);
    formData.append("city", null);
    formData.append("nativeLanguage", !userNativeLanguage ? "English" : userNativeLanguage);
    formData.append("roleName", role.name ? role.name : role);
    try {
      const response = await axios.post(
        `${hostname}/api/v1/profile/createprofile`,
        formData,
        {
          headers: {
            authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const userData = JSON.stringify(response.data.user);
      setUser(response.data.user);
      setProfile(true);
    } catch (error) {
      console.log(error);
    }
};
