import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/LibroCardStyles.js";

const LibroCard = ({ libro }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: `http://192.168.0.10:5000/${libro.portada_url}`,
          }}
          style={styles.cover}
        />
        <Text style={styles.title}>{libro.titulo}</Text>
        <Text style={styles.author}>{libro.autor}</Text>
        <Text style={styles.genre}>{libro.genero}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LibroCard;
