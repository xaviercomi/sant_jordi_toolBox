import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#292929",
    paddingTop: 90,
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  roseImage: {
    borderWidth: 1,
    borderColor: "#fff",
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 10,
    margin: 15,
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
});

export default styles;
