/* FR - Infos principales - partie 2 (Frame 32) - FR
Fusionner cette page avec CreateActivityScreen_Step1
*/
/*ENG - Main information - part 2 (Frame 32) - ENG
Merge this page with CreateActivityScreen_Step1
*/

import "./CreateActivityStyle";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import SwitchBtn from "../../components/SwitchBtn";
import { OneValueSlider } from "../../components/Sliders";
import Fields from "../../components/Fields";
import InputField from "../../components/InputField";

const CreateActivityScreen_Step2 = () => {
  return (
    <ScrollView>
      <View style={styles.switchRow}>
        <Text style={styles.boldTitle}>{createActivity.step1.unlimited}</Text>
        {/* "unlimited": "Unlimited participants" */}
        <SwitchBtn state={isAttendeeLimited} setState={setIsAttendeeLimited} />
      </View>
      <Text style={{ marginTop: -15, marginBottom: 20, color: "#a6a6a6" }}>
        {createActivity.step1.theOnly}
      </Text>
      {/* "theOnly": "(The only map without restrictions for organizers)" */}

      {isAttendeeLimited && (
        <>
        <View style={styles.fields}>
          <Text style={styles.boldTitle}>{createActivity.step1.attendee}</Text>
          {/* "attendee": "Attendee limitation" */}
          <OneValueSlider
            minVal={2}
            maxVal={25}
            state={attendeeLimit}
            setState={setAttendeeLimit}
          />
        </View>
        </>
      )}

      <View style={styles.switchRow}>
        <Text style={styles.boldTitle}>{createActivity.step1.price}</Text>
        <SwitchBtn state={hasPrice} setState={setHasPrice} />
      </View>

      <View style={styles.fields}>
        {hasPrice && (
          <>
            <View style={styles.fields}>
              <Fields
                text={createActivity.step1.price}
                state={priceValue}
                setState={setPriceValue}
              />
            </View>

            <View style={styles.fields}>
              <Fields
                text={createActivity.step1.buyTicket}
                state={ticketLink}
                setState={setTicketLink}
              />
            </View>
          </>
        )}
      </View>

      <View style={styles.fields}>
        <Text style={styles.boldTitle}>{createActivity.step1.howMuch}</Text>
        {/* "howMuch": "How much friends with me" */}
        <OneValueSlider
          minVal={0}
          maxVal={10}
          state={nbFriend}
          setState={setNbFriend}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.boldTitle}>Help for organizers</Text>
        <SwitchBtn state={helpForOrganizers} setState={setHelpForOrganizers} />
      </View>

      <View style={styles.fields}>
        {helpForOrganizers && (
          <>
            <View style={styles.switchRow}>
              <Text style={styles.boldTitle}>Change my reminder name</Text>
              <TouchableOpacity style={{ marginLeft: 5 }}>
                <Icon
                  name="help"
                  type="material-icons"
                  color={"black"}
                  size={22}
                />
              </TouchableOpacity>
              <SwitchBtn
                state={hasReminderName}
                setState={setHasReminderName}
              />
            </View>

            {hasReminderName && (
              <View>
                <InputField
                  title={"Reminder Name"}
                  state={reminderName}
                  setState={setReminderName}
                />
              </View>
            )}

            <View style={styles.switchRow}>
              <Text style={styles.boldTitle}>Request Co-organizers</Text>
              <SwitchBtn
                state={requestCoOrganizers}
                setState={setRequestCoOrganizers}
              />
            </View>

            {requestCoOrganizers && (
              <>
                <View style={styles.fields}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Choose Co-organizers request:
                  </Text>
                </View>

                <View style={styles.coOrganizersOptions}>
                  <TouchableOpacity
                    style={[
                      styles.coOrganizerCard,
                      { backgroundColor: "#59c09b" },
                    ]}
                    disabled={true}
                  >
                    <View style={styles.coOrganizerIcon}>
                      <Icon
                        name="mail"
                        type="ionicons"
                        color="#59c09b"
                        size={28}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Receive private message
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      manageCoOrganizerRequests(
                        "Come 5 min earlier to the activity"
                      )
                    }
                    style={[
                      styles.coOrganizerCard,
                      {
                        backgroundColor: coOrganizerRequests.includes(
                          "Come 5 min earlier to the activity"
                        )
                          ? "#59c09b"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <View
                      style={styles.coOrganizerIcon}
                      // onPress={console.log("first")}
                    >
                      <Icon
                        name="alarm"
                        type="ionicons"
                        color="#59c09b"
                        size={28}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: coOrganizerRequests.includes(
                          "Come 5 min earlier to the activity"
                        )
                          ? "white"
                          : "black",
                      }}
                    >
                      Come 5 min earlier to the activity
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.fields}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    I want to offer:
                  </Text>
                </View>

                <View style={styles.coOrganizersOptions}>
                  <TouchableOpacity
                    disabled={true}
                    onPress={() => manageCoOrganizerOffers("A free drink")}
                    style={[
                      styles.coOrganizerCard,
                      {
                        backgroundColor: "#59c09b",
                      },
                    ]}
                  >
                    <View
                      style={styles.coOrganizerIcon}
                      // onPress={console.log("first")}
                    >
                      <DrinkIcon width={30} height={30} />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      A free drink
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => manageCoOrganizerOffers("A free pass")}
                    style={[
                      styles.coOrganizerCard,
                      {
                        backgroundColor: coOrganizerOffers.includes(
                          "A free pass"
                        )
                          ? "#59c09b"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <View

                     style={styles.coOrganizerIcon}
                      // onPress={console.log("first")}
                    >
                      <TicketIcon width={34} height={34} />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: coOrganizerOffers.includes("A free pass")
                          ? "white"
                          : "black",
                      }}
                    >
                      A free pass
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => manageCoOrganizerOffers("Other gift")}
                    style={[
                      styles.coOrganizerCard,
                      {
                        backgroundColor: coOrganizerOffers.includes(
                          "Other gift"
                        )
                          ? "#59c09b"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <View
                      style={styles.coOrganizerIcon}
                      // onPress={console.log("first")}
                    >
                      <GiftIcon width={30} height={30} />
                    </View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: coOrganizerOffers.includes("Other gift")
                          ? "white"
                          : "black",
                      }}
                    >
                      Other gift
                    </Text>
                  </TouchableOpacity>
                </View>

                {coOrganizerOffers.includes("Other gift") && (
                  <View style={styles.fields}>
                    <InputField
                      title={"Enter your gift"}
                      state={coOrganizerGift}
                      setState={setCoOrganizerGift}
                    />
                  </View>
                )}
              </>
            )}
          </>
        )}
      </View>

      <View
        style={[createActivityStyle.savOrConButtons, { paddingHorizontal: 15 }]}
      >
        <LogButton
          text={createActivity.step3.goBack} // Previous
          width={150}
          backgroundColor={"#59c09b"}
          func={(n) => {
            setErrorMessage("");
            setStep(n);
          }}
          arg={step - 1}
        />
        <LogButton
          text={createActivity.step3.continue}
          width={150}
          backgroundColor={"#59c09b"}
          func={(n) => {
            setErrorMessage("");
            setStep(n);
          }}
          arg={step + 1}
        />
      </View>
    </ScrollView>
  );
};

export default CreateActivityScreen_Step2;
