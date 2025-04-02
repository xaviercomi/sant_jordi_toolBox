import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#292929",
    padding: 5,
    paddingTop: 30,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
  },
  backIcon: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  filterIcon: {
    width: 40,
    height: 40,
    alignSelf: "flex-end",
    margin: 20,
  },
  navigationContainer: {
    flex: 1,
    width: width * 0.6,
    backgroundColor: "rgba(41, 41, 41, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  textDrawer: {
    fontSize: 20,
    color: "#fff",
    marginBotton: 20,
    textAlign: "center",
  },
  dropdownMenu: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    padding: 10,
  },
  inputGroup: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  itemsContainer: {
    backgroundColor: "rgba(41, 41, 41, 0.8)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  filterButton: {
    alignSelf: "flex-end",
    margin: 20,
  },
  backButton: {
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default styles;
