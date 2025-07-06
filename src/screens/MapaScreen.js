import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import styles from "../styles/MapaStyles";
import { useNavigation } from "@react-navigation/native";
import swordBackIcon from "../../assets/backIcon.png";

const MapaScreen = () => {
  const [bookstores, setBookstores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const location = {
    lat: 41.3851,
    lng: 2.1734,
  };

  useEffect(() => {
    const fetchBookstores = async () => {
      try {
        const response = await axios.get(
          "https://sant-jordi-toolbox-backend.onrender.com/api/librerias",
          {
            params: {
              lat: location.lat,
              lng: location.lng,
            },
          }
        );

        setBookstores(response.data);
      } catch (err) {
        console.error("Error obtenint llibreries:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookstores();
  }, []);

  if (loading) {
    return (
      <View style={[styles.containerLoader, styles.loading]}>
        <ActivityIndicator style={styles.indicator} />
        <Text style={styles.textIndicator}>Carregant llibreries...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Error carregant dades.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {bookstores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapaScreen;
