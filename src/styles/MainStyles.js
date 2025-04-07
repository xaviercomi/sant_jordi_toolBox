import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
  modalButton: {
    marginTop: 25,
    padding: 20,
    width: width * 0.85,
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 17,
    color: "#C0C0C0",
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.85,
    margin: 20,
    backgroundColor: "#444",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalButtonClose: {
    backgroundColor: "#696969",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonCloseText: {
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#444",
    borderRadius: 20,
    padding: 20,
  },
  scrollView: {
    width: "100%",
  },
  interactionItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  thumb: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginVertical: 10,
  },
});

export default styles;
