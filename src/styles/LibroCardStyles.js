import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  cover: {
    width: 120,
    height: 180,
    resizeMode: "cover",
    borderRadius: 5,
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
