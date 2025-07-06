import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "../styles/CitaStyles.js";
import swordBackIcon from "../../assets/backIcon.png";
import { useNavigation } from "@react-navigation/native";
import { Share } from "react-native";
import QuoteCard from "../components/QuoteCard.js";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const { width } = Dimensions.get("window");

const CitaScreen = () => {
  const navigation = useNavigation();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetch(`${API_URL}/api/citas`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCitas(data);
      } catch (error) {
        console.log("Error fetching citas:", error.message);
      }
    };

    fetchCitas();
  }, []);

  const shareCita = async (autor, cita) => {
    try {
      const message = `${cita}\n- ${autor}`;
      await Share.share({ message });
    } catch (error) {
      console.log("Error sharing text:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comparteix una cita</Text>

      <FlatList
        style={styles.flatList}
        data={citas}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <QuoteCard
            quote={item.cita}
            author={item.autor}
            onShare={() => shareCita(item.autor, item.cita)}
          />
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <Image source={swordBackIcon} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default CitaScreen;
