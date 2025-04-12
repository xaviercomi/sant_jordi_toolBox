import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles/MapaStyles.js";

const MapaScreen = () => {
  const [bookstores, setBookstores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookstores = async () => {
      try {
        const query = `
          [out:json][timeout:25];
          (
            node(around:6000, 41.3851, 2.1734)["shop"="books"];
          );
          out center 100;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.elements || data.elements.length === 0) {
          console.warn("No bookstores found.");
          setLoading(false);
          return;
        }

        const bookstoresData = data.elements
          .filter((e) => e.lat && e.lon)
          .map((e) => ({
            id: e.id,
            name: e.tags?.name || "Llibreria sense nom",
            latitude: e.lat,
            longitude: e.lon,
          }));

        setBookstores(bookstoresData.slice(0, 100)); // limit to 100
      } catch (err) {
        console.error("Error fetching bookstores:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookstores();
  }, []);

  if (loading) {
    return (
      <View style={[styles.containerLoader, styles.indicator]}>
        <ActivityIndicator style={styles.indicator} />
        <Text style={styles.textIndicator}>Carregant...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>
          No s'han pogut carregar les llibreries.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.3851,
          longitude: 2.1734,
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
