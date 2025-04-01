import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    width: 350,
    padding: 20,
    backgroundColor: "#ffefd5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  authorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  shareButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#778899",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
