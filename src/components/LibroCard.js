import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/LibroCardStyles";
import Constants from "expo-constants";

const LibroCard = ({ libro, onShare }) => {
  const imageUrl = libro?.portada_url
    ? `${Constants.expoConfig?.extra?.API_URL || ""}${
        libro.portada_url.startsWith("/") ? "" : "/"
      }${libro.portada_url}`
    : null;

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <View style={styles.LibroCardStyles} collapsable={false}>
        <View style={styles.card}>
          <Image source={{ uri: imageUrl }} style={styles.cover} />
          <Text style={styles.title}>{libro.titulo}</Text>
          <Text style={styles.author}>{libro.autor}</Text>
          <Text style={styles.genre}>{libro.genero}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Recomana</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LibroCard;
