import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/LibroCardStyles.js";

const LibroCard = ({ libro, author }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: "http://192.168.0.10:5000/${libro.portada_url}" }}
        style={styles.cover}
      />
      <Text style={styles.author}>{libro.autor}</Text>
      <Text style={styles.genre}>{libro.genero}</Text>
    </TouchableOpacity>
  );
};

export default LibroCard;
