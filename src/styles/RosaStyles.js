import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    verticalAlign: "middle",
    backgroundColor: "#292929",
    paddingTop: 50,
    alignItems: "center",
    paddingBottom: 48,
  },
  header: {
    flex: 0.5,
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontSize: 25,
  },
  backIcon: {
    width: 80,
    height: 25,
    tintColor: "#fff",
  },
  rosesContainer: {
    width,
    alignItems: "center",
  },
  roseImage: {
    borderWidth: 1,
    borderColor: "#fff",
    width: width * 0.8,
    height: height * 0.5,
    borderRadius: 10,
    resizeMode: "cover",
  },
  colorMenu: {
    flex: 2,
    flexDirection: "row",
  },
  colorButton: {
    margin: 5,
    padding: 5,
    width: 50,
    height: 50,
    borderColor: "#CACACA",
    borderWidth: 1,
    borderRadius: 10,
  },
  textButton: {
    color: "white",
  },
  dialogContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    width: width * 0.9,
    alignSelf: "center",
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  dialogDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  dialogInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    color: "black",
  },
  dialogButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
