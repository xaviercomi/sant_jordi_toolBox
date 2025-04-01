import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/MainStyles.js";

import citaIcon from "../../assets/citaIco.png";
import rosaIcon from "../../assets/rosaIco.png";
import mapaIcon from "../../assets/mapaIco.png";
import libroIcon from "../../assets/libroIco.png";
import homeIcon from "../../assets/homeIcon.png";

const MainScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      setUserName(storedName || "Usuario");

      setTimeout(() => {
        setShowWelcome(false);
      }, 1000);
    };
    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      {showWelcome && userName !== "" ? (
        <Text style={styles.text}>Hola, {userName}!</Text>
      ) : (
        <View style={styles.grid}>
          <TouchableOpacity onPress={() => navigation.navigate("Cita")}>
            <Image source={citaIcon} style={styles.icon} />
            <View>
              <Text style={styles.textIcon}>Envia una cita</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Rosa")}>
            <Image source={rosaIcon} style={styles.icon} />
            <View>
              <Text style={styles.textIcon}>Regala una rosa</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Libro")}>
            <Image source={libroIcon} style={styles.icon} />
            <View>
              <Text style={styles.textIcon}>Recomana un llibre</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Mapa")}>
            <Image source={mapaIcon} style={styles.icon} />
            <View>
              <Text style={styles.textIcon}>Llibreries</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Image source={homeIcon} style={styles.homeIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
