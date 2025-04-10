import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/MainStyles.js";

import citaIcon from "../../assets/citaIco.png";
import rosaIcon from "../../assets/rosaIco.png";
import mapaIcon from "../../assets/mapaIco.png";
import libroIcon from "../../assets/libroIco.png";
import homeIcon from "../../assets/homeIcon.png";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const MainScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchUserAndInteractions = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          setUser(parsedUser);
          setUserName(parsedUser.nombre || "");

          const uuid = parsedUser.uuid;
          const response = await fetch(`${API_URL}/api/interacciones/${uuid}`);

          if (!response.ok) {
            const text = await response.text();
            console.error("Server error:", text);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setInteractions(data);
        }
      } catch (error) {
        console.error("Error fetching user or interactions:", error);
      } finally {
        setTimeout(() => {
          setShowWelcome(false);
        }, 1000);
      }
    };
    fetchUserAndInteractions();

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
        <Text style={styles.text}>Hola,`${userName}`!</Text>
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
            <Text style={styles.modalButtonText}>Els teus lliuraments</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Lliuraments</Text>
            <ScrollView style={styles.scrollView}>
              {interactions.length === 0 ? (
                <Text style={styles.emptyText}>
                  No hi ha lliuraments encara
                </Text>
              ) : (
                interactions.map((item) => {
                  const date = new Date(item.fecha_envio);
                  const formattedDate = date.toLocaleDateString();
                  const formattedTime = date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <View key={item.fecha_envio} style={styles.interactionItem}>
                      {item.destinatario_nombre && (
                        <Text style={styles.recipient}>
                          Per: {item.destinatario_nombre}
                        </Text>
                      )}
                      {/* Show book image if exists */}
                      {item.libro_imagen && (
                        <View style={styles.row}>
                          <Image
                            source={{
                              uri: `${API_URL}/${item.libro_imagen}`,
                            }}
                            style={styles.thumb}
                          />
                          {item.libro_titulo && (
                            <Text style={styles.title}>
                              {item.libro_titulo}
                            </Text>
                          )}
                        </View>
                      )}
                      {/* Show rose image if exists */}
                      {item.rosa_imagen && (
                        <Image
                          source={{
                            uri: `${API_URL}/${item.rosa_imagen}`,
                          }}
                          style={styles.thumb}
                        />
                      )}
                      {/* Show quote if exists */}
                      {item.cita_texto && (
                        <Text style={styles.quote}>"{item.cita}"</Text>
                      )}

                      <Text style={styles.timestamp}>
                        {formattedDate} - {formattedTime}
                      </Text>
                    </View>
                  );
                })
              )}
            </ScrollView>

            <TouchableHighlight
              style={styles.modalButtonClose}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalButtonCloseText}>Tanca</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
