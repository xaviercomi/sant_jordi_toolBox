import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import styles from "../styles/HomeStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import portada from "../../assets/portada.png";

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const handleEnter = async () => {
    if (name.trim() !== "") {
      await AsyncStorage.setItem("userName", name);
      navigation.navigate("Main");
    } else {
      alert("Si us plau entreu el vostre nom");
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
          style={styles.input}
          placeholder="Introdueix el teu nom"
          placeholderTextColor="#a9a9a950"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnter}>
          <Text style={styles.buttonText}>entra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
