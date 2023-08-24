//🇫🇷 pop ups au niveau de l'activity screen (Frame 41 sur Figma)
//🇬🇧 Activity screen pop ups (Frame 41 of Figma)

import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import styles from "./Styles/DialogsCss";
import React from "react";
import { Dialog } from "@rneui/themed";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("screen").width;
const premiumRoles = ["admin", "moderator"];

// const { activity } = json; //    🇫🇷 desactivé pour traduction 🇬🇧 desactivated for traduction

const DeleteActivityDialog = ({
  scr,
  dialogVisible,
  displayModal,
  deleteActivity,
}) => {
  const { activity } = scr;

  {
    /* 🇫🇷 langue passé juste avec la propieté scr juste pour cette function, il y a trois encore plus bas , la propieté scr est passé à chaque fois 🇫🇷 */
  }
  {
    /* 🇬🇧 language passed just with the scr property just for this function, there are three even lower, the scr property is passed each time 🇬🇧 */
  }

  return (
    <Dialog
      isVisible={dialogVisible}
      onBackdropPress={displayModal}
      overlayStyle={[styles.dialog, { width: screenWidth - 10 }]}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => displayModal(!dialogVisible)}
      >
        <Icon name="close" type="ionicons" color="#59b09c" size={24} />
      </TouchableOpacity>
      <Text style={styles.dialogText}>
        {activity.t2022_dialog_deleteConfirmation}
      </Text>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {/*Valider la suppression*/}
        {/* A la validation, supprimer l'activité dans la base de données */}
        <TouchableOpacity
          onPress={() => deleteActivity()} //console.log("Activity deleted")
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_yes}
          </Text>
        </TouchableOpacity>
        {/*****************************Annuler la suppression *****************/}
        <TouchableOpacity
          onPress={() => displayModal(false)}
          style={[styles.dialogButton, { backgroundColor: "#59c09b" }]}
        >
          <Text style={[styles.dialogButtonText, { color: "white" }]}>
            {activity.t2022_dialog_cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const CancelParticipationDialog = ({
  scr,
  dialogVisible,
  displayModal,
  unsubscribe,
}) => {
  const { activity } = scr;

  const handleParticipationCancelling = () => {
    unsubscribe();
    //setIsParticipating(!isParticipating);
    displayModal(!dialogVisible);
  };

  return (
    <Dialog
      isVisible={dialogVisible}
      onBackdropPress={displayModal}
      overlayStyle={[styles.dialog, { width: screenWidth - 10 }]}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => displayModal(!dialogVisible)}
      >
        <Icon name="close" type="ionicons" color="#59b09c" size={24} />
      </TouchableOpacity>

      <Text style={styles.dialogText}>
        {activity.t2022_dialog_cancelParticipationConfirmation}
      </Text>

      <View style={ styles.deleteContainer }>
        {/* Supprimer sa participation*/}
        <TouchableOpacity
          onPress={() => handleParticipationCancelling()}
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_confirm}
          </Text>
        </TouchableOpacity>
        {/* Rester dans la liste des participants */}
        <TouchableOpacity
          onPress={() => displayModal(!dialogVisible)}
          style={[styles.dialogButton, { backgroundColor: "#59c09b" }]}
        >
          <Text style={[styles.dialogButtonText, { color: "white" }]}>
            {activity.t2022_dialog_cancel}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

//Add display and setDisplay props to directly see the address when the user presses on "Participate now"?
const AddressAlertDialog = ({
  scr,
  dialogVisible,
  displayModal,
  subscribe,
}) => {
  //The dialog disappears and the value "isParticipating" in "ActivityScreen" sets to true or false

  const { activity } = scr;

  const handleParticipation = () => {
    //setIsParticipating(!isParticipating);
    subscribe();
    displayModal(!dialogVisible);
  };

  return (
    <Dialog
      isVisible={dialogVisible}
      onBackdropPress={displayModal}
      overlayStyle={[styles.dialog, { width: screenWidth - 20 }]}
      style={{ backgroundColor: "#59c09b" }}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => displayModal(!dialogVisible)}
      >
        <Icon name="close" type="ionicons" color="#59c09b" size={24} />
      </TouchableOpacity>

      <Text style={styles.dialogText}>
        {activity.t2022_dialog_adressOnlyForParticipants}
      </Text>
      <View style={ styles.activateContainer }>
        {/*Activer la participation*/}
        <TouchableOpacity
          onPress={() => handleParticipation()}
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_participateNow}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const FriendsInfos = ({ scr, isVisible, setIsVisible }) => {
  const { activity } = scr;

  const handleClose = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={setIsVisible}
      overlayStyle={[styles.dialog, { width: screenWidth - 10 }]}
      style={{ backgroundColor: "#59c09b" }}
    >
      <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={handleClose}>
        <Icon name="close" type="ionicons" color="#59c09b" size={24} />
      </TouchableOpacity>

      <Text style={styles.dialogText}>
        {activity.t2022_dialog_otherPeopleComing}
      </Text>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/*Activer la participation*/}
        <TouchableOpacity
          onPress={() => handleClose()}
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_gotIt}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const DeleteRepeatEventDialog = ({
  scr,
  dialogVisible,
  displayModal,
  state,
  setState,
}) => {
  const { activity } = scr;

  return (
    <Dialog
      isVisible={dialogVisible}
      onBackdropPress={displayModal}
      overlayStyle={[styles.dialog, { width: screenWidth - 10 }]}
      style={{ backgroundColor: "#59c09b" }}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => displayModal(!dialogVisible)}
      >
        <Icon name="close" type="ionicons" color="white" size={24} />
      </TouchableOpacity>
      <Text style={styles.dialogText}>
        {activity.t2022_dialog_repeatedActivityDialogText}
      </Text>
      <View style={ styles.deleteContainerTwo }>
        {/* Supprimer l'activité du jour mais garder ses autres dates */}
        <TouchableOpacity
          onPress={() =>
            console.log("Deleted activities; the other ones are still on")
          }
          style={[styles.dialogButton, { backgroundColor: "#59c09b" }]}
        >
          <Text style={[styles.dialogButtonText, { color: "white" }]}>
            {activity.t2022_dialog_deleteOneActivity}
          </Text>
        </TouchableOpacity>
        {/* Supprimer l'activité et ses autres dates*/}
        <TouchableOpacity
          onPress={() => console.log("Activity deleted")}
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_deleteAllActivitiesOccurences}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const EmailCheckDialog = ({
  dialogVisible,
  displayModal,
  goToMailCheckScreen,
  scr,
}) => {
  const { activity } = scr;

  return (
    <Dialog
      isVisible={dialogVisible}
      onBackdropPress={displayModal}
      overlayStyle={[styles.dialog, { width: screenWidth - 10 }]}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => displayModal(!dialogVisible)}
      >
        <Icon name="close" type="font-awesome" color="#59c09b" size={24} />
      </TouchableOpacity>
      <Text style={styles.dialogText}>
        {activity.t2022_dialog_confirmEmailInfo}
      </Text>
      <View style={ styles.navigationContainer } >
        {/*Navigation vers la page de check d'email*/}
        <TouchableOpacity
          onPress={() => goToMailCheckScreen()}
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_confirmEmailInfo_check}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const ReLoginDialog = ({
  dialogVisible,
  displayModal,
  backToActivitiesScreen,
  scr,
}) => {
  const { activity, verificationCode } = scr;

  return (
    <Dialog
      isVisible={dialogVisible}
      onBackdropPress={displayModal}
      overlayStyle={[styles.dialog, { width: screenWidth - 10 }]}
    >
      <TouchableOpacity
        style={{ alignSelf: "flex-end" }}
        onPress={() => displayModal(!dialogVisible)}
      >
        <Icon name="close" type="font-awesome" color="#59c09b" size={24} />
      </TouchableOpacity>
      <Text style={styles.dialogText}>
        {verificationCode.t2022_reLoginMessage}
      </Text>
      <View style={ styles.navigationContainer } >
        {/*Navigation vers la page de check d'email*/}
        <TouchableOpacity
          onPress={() => backToActivitiesScreen()}
          style={styles.dialogButton}
        >
          <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>
            {activity.t2022_dialog_gotIt}
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

export default DeleteActivityDialog;
export { CancelParticipationDialog };
export { AddressAlertDialog };
export { DeleteRepeatEventDialog, FriendsInfos };
export { EmailCheckDialog };
export { ReLoginDialog };
