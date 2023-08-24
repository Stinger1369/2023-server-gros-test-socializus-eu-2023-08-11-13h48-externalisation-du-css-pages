import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import styles from "./Styles/CalendarZoomOutCss"
export default function CalendarZoomOut({
  title,
  participant,
  zipCode,
  type,
  time,
  date,
  like,
  free,
  attendee,
  image,
}) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.clock}>{time}</Text>
      </View>
      <View
        style={[
          styles.eventInfoContainer,
          {
            backgroundColor:
              attendee && participant < 15
                ? "#D8EDE6"
                : attendee && participant === 15
                ? "#E1E0E0"
                : "#FDFDFD",
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infosLine}>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.participantContainer}>
            <View style={styles.emotePeople}></View>
            <Text style={styles.participant}>{participant}/15</Text>
          </View>
          {like ? (
            <View style={styles.like}></View>
          ) : (
            <View style={styles.notLike}></View>
          )}

          <Text style={styles.zipCode}>{zipCode}</Text>
          {free ? (
            <View style={styles.free}></View>
          ) : (
            <View style={styles.notFree}></View>
          )}
          <Text style={styles.type}>{type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

