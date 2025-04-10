import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#292929",
    paddingTop: 60,
  },
  text: {
    color: "#fff",
    fontSize: 25,
  },
  backIcon: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroudColor: "#fff",
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
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    paddingTop: 30,
    paddingBottom: 70,
    margin: 15,
    marginTop: 3,
  },
  colorButton: {
    flex: 1,
    flexDirection: "row",
    width: 50,
    height: 50,
    borderColor: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  textButton: {
    color: "white",
  },
  dialogContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    width: width * 0.8,
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
  },
  dialogButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
