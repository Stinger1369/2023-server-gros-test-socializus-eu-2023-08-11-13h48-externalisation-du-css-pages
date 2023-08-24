import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 13,
  },
  chatItemInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 13,
    borderBottomWidth: 0.75,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0,0,0,0.2)",
  },
  chatItemLeft: {
    justifyContent: "center",
    alignItems: "center",
  },
  chatItemCenter: {
    justifyContent: "space-between",
  },
  chatItemRight: {
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  chatItemImage: {
    width: 51,
    height: 51,
    borderRadius: 100,
    objectFit: "cover",
    marginRight: 23,
    backgroundColor: "#59c09b",
  },
  chatFriend: {
    fontWeight: "500",
    fontSize: 16,
    color: "#000",
    marginBottom: 6,
  },
  chatItemMessagePreview: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000",
    width: 220,
    height: 30,
  },
  chatItemTime: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    marginBottom: 9,
  },
  chatItemBadge: {
    width: 18,
    height: 18,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF0000",
  },
});

export default styles;
