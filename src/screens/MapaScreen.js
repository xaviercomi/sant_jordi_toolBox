import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import Constants from "expo-constants";
import styles from "../styles/MapaStyles";

const GOOGLE_API_KEY = Constants.expoConfig.extra.GOOGLE_MAPS_API_KEY;

const MapaScreen = () => {
  const [bookstores, setBookstores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const location = {
    lat: 41.3851,
    lng: 2.1734,
  };

  useEffect(() => {
    const fetchBookstores = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${location.lat},${location.lng}`,
              radius: 6000,
              keyword: "bookstore",
              key: GOOGLE_API_KEY,
            },
          }
        );

        if (response.data.results.length === 0) {
          console.warn("No bookstores found.");
          return;
        }

        const parsed = response.data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }));

        setBookstores(parsed);
      } catch (err) {
        console.error("Error fetching Google Places:", err);
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
