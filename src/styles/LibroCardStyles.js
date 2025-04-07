import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    height: height * 0.6,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "#353535",
    borderRadius: 10,
    alignItems: "center",
  },
  cover: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
    color: "gray",
  },
  author: {
    fontSize: 15,
    color: "gray",
  },
  genre: {
    fontSize: 13,
    color: "#ff8c00",
    fontStyle: "italic",
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: "#696969",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shareButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dialogContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dialogDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  dialogInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default styles;
