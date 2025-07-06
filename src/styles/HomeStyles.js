import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 50,
    backgroundColor: "#393939",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 16,
  },
  title: { fontSize: 40, color: "#fff" },
  subtitle: { fontSize: 20, color: "#fff" },
  image: {
    height: 290,
    width: 290,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#fff",
  },
  inputButton: {
    flexDirection: "column",
    padding: 15,
    justifyContent: "center",
    rowGap: 12,
    width: "100%",
    alignItems: "center",
  },
  input: {
    color: "#fff",
    fontSize: 15,
    backgroundColor: "#292929",
    paddingVertical: 15,
    paddingLeft: 15,
    borderRadius: 10,
    width: "75%",
    borderWidth: 1,
    borderColor: "#fff",
  },
  button: {
    backgroundColor: "#292929",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    width: "75%",
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    size: "large",
    color: "#fff",
  },
  textIndicator: {
    marginTop: 20,
    size: 20,
    color: "#fff",
  },
});

export default styles;
