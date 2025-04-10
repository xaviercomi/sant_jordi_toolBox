import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import styles from "../styles/HomeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import portada from "../../assets/portada.png";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [uuidExists, setUuidExists] = useState(false);

  // En el cas de que l'usuari estigui registrat
  useEffect(() => {
    const checkStoredUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setName(user.nombre || "");
        setUuidExists(true);
      }
    };
    checkStoredUser();
  }, []);

  const handleEnter = async () => {
    if (uuidExists) {
      navigation.navigate("Main");
    }
    if (name.trim() === "") {
      alert("Si us plau entreu el vostre nom");
      return;
    }

    try {
      let uuid = await AsyncStorage.getItem("uuid");
      if (!uuid) {
        uuid = uuidv4();
        await AsyncStorage.setItem("uuid", uuid);
      }

      const response = await fetch(`${API_URL}/api/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uuid, nombre: name }),
      });

      const user = await response.json();

      await AsyncStorage.setItem("user", JSON.stringify(user));

      navigation.navigate("Main");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error connectant amb el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sant Jordi</Text>
        <Text style={styles.subtitle}>toolBox</Text>
      </View>

      <Image source={portada} style={styles.image} />

      <View style={styles.inputButton}>
        <TextInput
          style={[
            styles.input,
            uuidExists && { backgroundColor: "#292929", color: "#fff" },
          ]}
          placeholder={uuidExists ? `${name}` : "Introdueix el teu nom"}
          placeholderTextColor="#a9a9a9"
          value={name}
          onChangeText={uuidExists ? null : setName}
          editable={!uuidExists}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnter}>
          <Text style={styles.buttonText}>
            {uuidExists ? "Continua" : "Entra"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
