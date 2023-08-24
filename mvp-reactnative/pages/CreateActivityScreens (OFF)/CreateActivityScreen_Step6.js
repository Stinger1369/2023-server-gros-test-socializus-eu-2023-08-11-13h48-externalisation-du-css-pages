// FR - Détails de l'activité, parité,... (Frame 35) - FR
// ENG - Activity details, parity,... (Frame 35) - ENG
import hostname from "../backendconnect/hostname"
import { createActivityStyle } from "./CreateActivityStyle";
import { Text, View } from 'react-native'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Json from "../../assets/json/en.json";
// import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import LogButton from "../../components/LogButtons";


const CreateActivityScreen_Step6 = () => {
  return (
    <ScrollView style={createActivityStyle.container}>
        {/* ----------------Titles---------------- */}
        <Text
          style={[
            createActivityStyle.boldTitle,
            { alignSelf: "center", marginVertical: 10 },
          ]}
        >
          Your activity optional features:
        </Text>
        <View style={createActivityStyle.row}>
          {/* <CheckboxSquare
            title={"50% Guys 50% Girls"}
            state={state}
            setState={setState}
          />
          <CheckboxSquare
            title={"Girls only"}
            state={state}
            setState={setState}
          />
          <CheckboxSquare
            title={"Guys only"}
            state={state}
            setState={setState}
          /> */}
          <CheckboxSquare
            title={"Events visible for friends only"}
            state={friendsOnly}
            setState={setFriendsOnly}
          />
          <CheckboxSquare
            title={"Select people"}
            state={selectPeople}
            setState={setSelectPeople}
          />
          <CheckboxSquare
            title={"Phone number visible to attendees"}
            state={allowPhoneNumberDisplay}
            setState={setAllowPhoneNumberDisplay}
          />
          {/* <CheckboxSquare
            title={createActivity.step4.allow}
            state={allowCoOrg}
            setState={setAllowCoOrg}
          /> */}
        </View>

        {/* <View style={createActivityStyle.switchRow}>
          <Text style={[createActivityStyle.boldTitle, { color: "#1E7354" }]}>
            Repeat event:
          </Text>
          <SwitchBtn state={repeatEvent} setState={setRepeatEvent} />
        </View>

        {repeatEvent && (
          <>
            <View style={createActivityStyle.timeDataContainer}>
              <TouchableOpacity
                onPress={() => setRepeatEventFrequency("weekly")}
                style={
                  repeatEventFrequency === "weekly"
                    ? [
                        createActivityStyle.timePickView,
                        {
                          backgroundColor: "#59c09b",
                          borderBottomLeftRadius: 15,
                          borderTopLeftRadius: 15,
                        },
                      ]
                    : createActivityStyle.timePickView
                }
              >
                <Text
                  style={
                    repeatEventFrequency === "weekly"
                      ? [createActivityStyle.boldTitleSecondary, { color: "white" }]
                      : [createActivityStyle.boldTitleSecondary, { color: "black" }]
                  }
                >
                  Weekly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRepeatEventFrequency("monthly")}
                style={
                  repeatEventFrequency === "monthly"
                    ? [
                        createActivityStyle.timePickView,
                        createActivityStyle.middle,
                        { backgroundColor: "#59c09b" },
                      ]
                    : [createActivityStyle.timePickView, createActivityStyle.middle, { height: 40 }]
                }
              >
                <Text
                  style={
                    repeatEventFrequency === "monthly"
                      ? [createActivityStyle.boldTitleSecondary, { color: "white" }]
                      : [createActivityStyle.boldTitleSecondary, { color: "black" }]
                  }
                >
                  Monthly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRepeatEventFrequency("yearly")}
                style={
                  repeatEventFrequency === "yearly"
                    ? [
                        createActivityStyle.timePickView,
                        {
                          backgroundColor: "#59c09b",
                          borderBottomRightRadius: 15,
                          borderTopRightRadius: 15,
                        },
                      ]
                    : createActivityStyle.timePickView
                }
              >
                <Text
                  style={
                    repeatEventFrequency === "yearly"
                      ? [createActivityStyle.boldTitleSecondary, { color: "white" }]
                      : [createActivityStyle.boldTitleSecondary, { color: "black" }]
                  }
                >
                  Yearly
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={createActivityStyle.boldTitle}>Select which days:</Text>
            <View
              style={[
                createActivityStyle.row,
                { marginVertical: 10, justifyContent: "center" },
              ]}
            >
              <TouchableOpacity
                style={
                  repeatEventDays.includes("monday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("monday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("monday")
                      ? "white"
                      : "black",
                  }}
                >
                  Monday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("tuesday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("tuesday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("tuesday")
                      ? "white"
                      : "black",
                  }}
                >
                  Tuesday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("wednesday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("wednesday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("wednesday")
                      ? "white"
                      : "black",
                  }}
                >
                  Wednesday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("thursday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("thursday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("thursday")
                      ? "white"
                      : "black",
                  }}
                >
                  Thursday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("friday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("friday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("friday")
                      ? "white"
                      : "black",
                  }}
                >
                  Friday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("saturday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("saturday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("saturday")
                      ? "white"
                      : "black",
                  }}
                >
                  Saturday
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  repeatEventDays.includes("sunday")
                    ? [createActivityStyle.styledInputDay, { backgroundColor: "#59c09d" }]
                    : createActivityStyle.styledInputDay
                }
                onPress={() => manageFrequencyDays("sunday")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: repeatEventDays.includes("sunday")
                      ? "white"
                      : "black",
                  }}
                >
                  Sunday
                </Text>
              </TouchableOpacity>
            </View>

            <DateField
              title={"Repeat until: "}
              state={repeatEventEndDate}
              setState={setRepeatEventEndDate}
            />
          </>
        )} */}

        <View style={createActivityStyle.switchRow}>
          <Text style={[createActivityStyle.boldTitle, { color: "#1E7354" }]}>
            Manage Parity:
          </Text>
          <SwitchBtn state={parity} setState={setParity} />
        </View>

        {parity && (
          <View style={createActivityStyle.fields}>
            <ParitySlider state={parityValues} setState={setParityValues} />
          </View>
        )}

        <View style={createActivityStyle.switchRow}>
          <Text style={[createActivityStyle.boldTitle, { color: "#1E7354" }]}>
            Allow guests:
          </Text>
          <SwitchBtn state={allowGuests} setState={setAllowGuests} />
        </View>

        {allowGuests && (
          <View>
            <OneValueSlider
              minVal={1}
              maxVal={5}
              state={howManyGuests}
              setState={setHowManyGuests}
            />
          </View>
        )}

        <View style={createActivityStyle.switchRow}>
          <Text style={[createActivityStyle.boldTitle, { color: "#1E7354" }]}>
            Age Restriction:
          </Text>
          <SwitchBtn state={ageRestriction} setState={setAgeRestriction} />
        </View>

        {ageRestriction && (
          <View>
            <TwoValuesSlider
              minVal={18}
              maxVal={99}
              state={ages}
              setState={setAges}
            />
          </View>
        )}

        {/* ------------Save or Continue------------ */}
        <View style={[createActivityStyle.savOrConButtons, { marginTop: 40 }]}>
          <LogButton
            text={createActivity.step3.goBack}
            width={150}
            backgroundColor={"#59c09b"}
            func={setStep}
            arg={step - 1}
          />
          <LogButton
            text={createActivity.step4.publish}
            width={150}
            backgroundColor={"#59c09b"}
            func={() => {
              try {
                const sendRequest = async () => {
                  const token = await AsyncStorage.getItem("userToken");
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("isOnline", online);
                  formData.append("address", address);
                  formData.append(
                    "location",
                    !online ? JSON.stringify(location) : null
                  );
                  formData.append("date", date);
                  formData.append("startTime", startTime);
                  formData.append("isAttendeeLimited", isAttendeeLimited);
                  formData.append(
                    "attendeeLimit",
                    isAttendeeLimited ? null : attendeeLimit
                  );
                  formData.append("hasPrice", hasPrice);
                  formData.append("price", hasPrice ? priceValue : 0);
                  formData.append("ticketLink", hasPrice ? ticketLink : null);

                  formData.append("helpForOrganizers", helpForOrganizers);
                  formData.append("hasReminderName", hasReminderName);
                  formData.append("reminderName", reminderName);
                  formData.append("requestCoOrganizers", requestCoOrganizers);
                  formData.append("coOrganizerRequests", coOrganizerRequests);
                  formData.append("coOrganizerOffers", coOrganizerOffers);
                  formData.append("coOrganizerGift", coOrganizerGift);

                  formData.append("topic", topic);
                  formData.append("activityImage", activityImage);
                  formData.append("description", description);
                  formData.append("howToFind", howToFind);
                  formData.append("friendsOnly", friendsOnly);
                  formData.append("selectPeople", selectPeople);
                  formData.append(
                    "allowPhoneNumberDisplay",
                    allowPhoneNumberDisplay
                  );
                  formData.append("allowCoOrganiser", allowCoOrg);
                  formData.append("repeatEvent", repeatEvent);
                  formData.append(
                    "repeatEventFrequency",
                    repeatEvent ? repeatEventFrequency : null
                  );
                  formData.append(
                    "repeatEventDays",
                    repeatEvent ? repeatEventDays : null
                  );
                  formData.append(
                    "repeatEventEnd date",
                    repeatEvent ? repeatEventEndDate : null
                  );
                  formData.append("parity", parity);
                  formData.append("parityValues", JSON.stringify(parityValues));
                  formData.append("allowGuests", allowGuests);
                  formData.append(
                    "howManyGuests",
                    allowGuests ? howManyGuests : 0
                  );
                  formData.append("ageRestriction", ageRestriction);
                  formData.append(
                    "ages",
                    ageRestriction
                      ? JSON.stringify(ages)
                      : JSON.stringify([0, 0])
                  );
                  const { data } = await axios.post(
                    `${hostname}/api/activities/createactivity`,
                    formData,
                    {
                      headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  console.log("Activity data = ", data);
                  setStep(1);
                  setTitle("");
                  navigation.navigate("Activity", {
                    event: data.activity,
                  });
                };
                sendRequest();
              } catch (error) {
                console.log("Activity save failed: " + error);
              }
            }}
            // arg={null}
          />
        </View>
      </ScrollView>
  )
}

export default CreateActivityScreen_Step6