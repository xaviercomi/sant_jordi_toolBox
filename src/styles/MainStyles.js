import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  text: { color: "#fff", fontSize: 25 },
  textIcon: { color: "#fff", fontSize: 12, paddingLeft: 10 },
  grid: {
    flex: 1,
    flexDirection: "row",
    gap: 50,
    padding: 20,
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  icon: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  homeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 360,
  },
  homeIcon: {
    width: 40,
    height: 40,
  },
});

export default styles;
