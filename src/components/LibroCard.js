import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import styles from "../styles/LibroCardStyles.js";

const LibroCard = ({ libro }) => {
  const cardRef = useRef(null);

  const shareBookCard = async () => {
    try {
      const uri = await captureRef(cardRef, {
        format: "jpg",
        quality: 1,
        result: "tmpfile",
      });

      if (!uri) {
        console.log("Capture failed, no URI generated");
        return;
      }

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          "Error",
          "La funció de compartir no està disponible en aquest dispositiu"
        );
        return;
      }

      await Sharing.shareAsync(uri, {
        dialogTitle: `Compartir ${libro.titulo}`,
        mimeType: "image/jpeg",
      });
    } catch (error) {
      console.log("Error sharing book:", error);
      Alert.alert("Error", "No s'ha pogut compartir el llibre");
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <View
        ref={cardRef}
        style={{ backgroundColor: "transparent" }}
        collapsable={false}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: `http://192.168.0.10:5000/${libro.portada_url}` }}
            style={styles.cover}
          />
          <Text style={styles.title}>{libro.titulo}</Text>
          <Text style={styles.author}>{libro.autor}</Text>
          <Text style={styles.genre}>{libro.genero}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={shareBookCard}>
        <Text style={styles.shareButtonText}>Recomana</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LibroCard;
