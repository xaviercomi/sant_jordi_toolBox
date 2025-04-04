import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from "react-native";
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
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          setUser(parsedUser);
          setUserName(parsedUser.nombre || "");
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      } finally {
        setTimeout(() => {
          setShowWelcome(false);
        }, 1000);
      }
    };

    fetchUser();

    const init = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      const hasVisited = await AsyncStorage.getItem("hasVisitedMainScreen");

      setUserName(storedName);

      if (!hasVisited) {
        setShowWelcome(true);
        await AsyncStorage.setItem("hasVisitedMainScreen", "true");
      } else {
        setShowWelcome(false);
      }
    };

    init();
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

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.modalButtonText}>Amb qui has compartit</Text>
          </TouchableOpacity>
        </View>
      )}

      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <Text> Hello! mother fucker</Text>
            <TouchableHighlight
              style={styles.modalButtonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalButtonCloseText}>Tanca</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>

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
