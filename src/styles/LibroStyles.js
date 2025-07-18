import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#292929",
    paddingTop: 30,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
  },
  backIcon: {
    width: 80,
    height: 25,
    marginBottom: 5,
    alignSelf: "center",
    tintColor: "white",
  },
  filterIcon: {
    width: 35,
    height: 35,
    alignSelf: "flex-end",
    margin: 20,
    tintColor: "white",
    zIndex: 1,
  },
  navigationContainer: {
    flex: 1,
    width: width * 0.75,
    backgroundColor: "rgba(41, 41, 41, 0.8)",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  backButton: {
    alignSelf: "center",
    marginVertical: 20,
  },
  multiSelectContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  dropdownMenu: {
    backgroundColor: "#292929",
  },
  itemsContainer: {
    backgroundColor: "#696969",
  },
  searchInput: {
    color: "#FFF",
    backgroundColor: "#444",
  },
  multiSelectText: {
    color: "#FFF",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#292929",
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  closeText: {
    color: "#778899",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputGroup: {
    paddingLeft: 25,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
  },
  dropdownText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
  filterButton: {
    alignSelf: "flex-end",
    margin: 20,
    zIndex: 1,
  },
  closedSelector: {
    backgroundColor: "#3A3A3A",
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderWidth: 0, // Remove default border if any
    elevation: 0, // Remove Android shadow
    shadowOpacity: 0, // Remove iOS shadow
  },
  closedSelectorText: {
    color: "#3A3A3A",
    fontSize: 16,
    paddingLeft: 10,
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
