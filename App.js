import React from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen.js";
import MainScreen from "./src/screens/MainScreen.js";
import MapaScreen from "./src/screens/MapaScreen.js";
import RosaScreen from "./src/screens/RosaScreen.js";
import CitaScreen from "./src/screens/CitaScreen.js";
import LibroScreen from "./src/screens/LibroScreen.js";

// Configuración del stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Mapa" component={MapaScreen} />
        <Stack.Screen name="Rosa" component={RosaScreen} />
        <Stack.Screen name="Cita" component={CitaScreen} />
        <Stack.Screen name="Libro" component={LibroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
