import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import styles from "./Styles/ActivityScreenDialogsCss"
import React from 'react'
import { Icon, Dialog } from "@rneui/themed";

const DeleteActivityDialog = ({dialogVisible, displayModal}) => {
  return (
    <Dialog isVisible={dialogVisible} onBackdropPress={displayModal}>
          <TouchableOpacity
            style={ styles.modalButton }
            onPress={() => displayModal(!dialogVisible)}
          >
            <Icon name="close" type="ionicons" color="#59b09c" size={24} />
          </TouchableOpacity>
          <Text style={styles.dialogText}>
            Are you sure you want to delete ?
          </Text>
          <View
            style={ styles.dialogView }
          >
            {/*Valider la suppression*/}
            {/* A la validation, supprimer l'activité dans la base de données */}
            <TouchableOpacity
              onPress={() => console.log("Activity deleted")}
              style={styles.dialogButton}
            >
              <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>Yes</Text>
            </TouchableOpacity>
            {/*****************************Annuler la suppression *****************/}
            <TouchableOpacity
              onPress={() => displayModal(false)}
              style={[styles.dialogButton, { backgroundColor: "#59c09b" }]}
            >
              <Text style={[styles.dialogButtonText, {color: "white"}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
  )
}

const CancelParticipationDialog = ({dialogVisible, displayModal, isParticipating, setIsParticipating}) => {
  const handleParticipationCancelling = () => {
    setIsParticipating(!isParticipating);
    displayModal(!dialogVisible);
  }

  return (
    <Dialog isVisible={dialogVisible} onBackdropPress={displayModal}>
          <TouchableOpacity
            style={ styles.modalButton }
            onPress={() => displayModal(!dialogVisible)}
          >
            <Icon name="close" type="ionicons" color="#59b09c" size={24} />
          </TouchableOpacity>

          <Text style={styles.dialogText}>
            Are you sure to cancel your participation ?
          </Text>

          <View
            style={ styles.dialogView }
          >
            {/* Supprimer sa participation*/}
            <TouchableOpacity
              onPress={() => handleParticipationCancelling()}
              style={styles.dialogButton}
            >
              <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>Confirm</Text>
            </TouchableOpacity>
            {/* Rester dans la liste des participants */}
            <TouchableOpacity
              onPress={() => displayModal(!dialogVisible)}
              style={[styles.dialogButton, { backgroundColor: "#59c09b" }]}
            >
              <Text style={[styles.dialogButtonText, {color: "white"}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
  )
}

//Add display and setDisplay props to directly see the address when the user presses on "Participate now"?
const AddressAlertDialog = ({dialogVisible, displayModal, isParticipating, setIsParticipating}) => {
  //The dialog disappears and the value "isParticipating" in "ActivityScreen" sets to true or false

    const handleParticipation = () => {
        setIsParticipating(!isParticipating);
        displayModal(!dialogVisible);
    }
    console.log(isParticipating)

  return (
    <Dialog isVisible={dialogVisible} onBackdropPress={displayModal} style={{backgroundColor: "#59c09b"}}>
          <TouchableOpacity
            style={ styles.modalButton }
            onPress={() => displayModal(!dialogVisible)}
          >
            <Icon name="close" type="ionicons" color="#59c09b" size={24} />
          </TouchableOpacity>

          <Text style={styles.dialogText}>
           Ooops ! Address is only available for participants
          </Text>
          <View
            style={ styles.participantsView }
          >
            {/*Activer la participation*/}
            <TouchableOpacity
              onPress={() => handleParticipation()}
              style={styles.dialogButton}
            >
              <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>Participate now</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
  )
}

const DeleteRepeatEventDialog = ({dialogVisible, displayModal, state, setState}) => {
  return (
    <Dialog isVisible={dialogVisible} onBackdropPress={displayModal} style={{backgroundColor: "#59c09b"}}>
          <TouchableOpacity
            style={ styles.modalButton }
            onPress={() => displayModal(!dialogVisible)}
          >
            <Icon name="close" type="ionicons" color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.dialogText}>
           This event is on repeat, do you want to cancel all the concerned activities or just this one ?
          </Text>
           <View
            style={ styles.dialogView }
          >
            {/* Supprimer l'activité du jour mais garder ses autres dates */}
            <TouchableOpacity
              onPress={() => console.log("Deleted activities; the other ones are still on")}
              style={[styles.dialogButton, { backgroundColor: "#59c09b" }]}
            >
              <Text style={[styles.dialogButtonText, {color: "white"}]}>Delete only this activity</Text>
            </TouchableOpacity>
            {/* Supprimer l'activité et ses autres dates*/}
            <TouchableOpacity
              onPress={() => console.log("Activity deleted")}
              style={styles.dialogButton}
            >
              <Text style={[styles.dialogButtonText, { color: "#59c09b" }]}>Delete all occurences of this activity</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
  )
}
export default DeleteActivityDialog;
export {CancelParticipationDialog};
export {AddressAlertDialog};
export {DeleteRepeatEventDialog};

