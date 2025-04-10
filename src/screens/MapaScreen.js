import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "../styles/MapaStyles.js";

const MapaScreen = () => {
  const [bookstores, setBookstores] = useState([]);

  useEffect(() => {
    const fetchBookstores = async () => {
      try {
        const query = `
          [out:json];
          (
            node(around:100000, 41.3851, 2.1734)["shop"="books"];
          );
          out center;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.elements || data.elements.length === 0) {
          console.warn("No bookstores found.");
          return;
        }

        // Extract bookstore locations
        const bookstoresData = data.elements.map((element) => ({
          id: element.id,
          name: element.tags?.name || "Unnamed Bookstore",
          latitude: element.lat,
          longitude: element.lon,
        }));

        setBookstores(bookstoresData);
      } catch (error) {
        console.error("Error fetching bookstores:", error);
      }
    };

    fetchBookstores();
  }, []);

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
