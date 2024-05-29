import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#000000",
    borderRadius: 10,
    alignItems: "center",
    height: 75,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FF0000",
  },
  cardImage: {
    width: 70,
    height: 70,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardTextContainer: {
    width: "100%",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    marginBottom: 5,
  },
  artistText: {
    fontSize: 14,
    color: "#FF0000",
  },
});

export default styles;
