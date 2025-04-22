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
  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center', 
  },  
  backIcon: {
    width: 80,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
});

export default styles;
