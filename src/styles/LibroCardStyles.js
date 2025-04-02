import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    height: height * 0.6,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  cover: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    color: "gray",
  },
  genre: {
    fontSize: 12,
    color: "blue",
    fontStyle: "italic",
  },
});

export default styles;
