import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/LibroCardStyles";

const LibroCard = ({ libro, onShare }) => {
  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <View style={styles.LibroCardStyles} collapsable={false}>
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
      <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Text style={styles.shareButtonText}>Recomana</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LibroCard;
