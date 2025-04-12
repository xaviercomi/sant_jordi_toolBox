import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { with: "100%", height: "100%" },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerLoader: {
    flex: 1,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
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
