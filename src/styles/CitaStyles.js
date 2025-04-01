import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#292929",
    paddingTop: 90,
    paddingBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  backIcon: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroudColor: "#fff",
  },
  citaCard: {
    width: width * 0.9,
    aspectRatio: 3 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  citaContent: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
  },
  citaText: {
    fontSize: 18,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
  },
  autorText: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "right",
    marginTop: 10,
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shareButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
