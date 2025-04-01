import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "../styles/LibroStyles.js";
import swordBackIcon from "../../assets/backIcon.png";
import { useNavigation } from "@react-navigation/native";
import LibroCard from "../components/LibroCard.js";

const { width } = Dimensions.get("window");

const LibroScreen = () => {
  const navigation = useNavigation();
  const [libros, setLibros] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch("http://192.168.0.10:5000/api/libros");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.log("Error fetching libros:", error.message);
      }
    };
    fetchLibros();
  }, []);

  const filterByGenre = (genre) => {
    if (genre === "all") {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };

  const filteredBooks = selectedGenre
    ? libros.filter((libro) => libro.genero === selectedGenre)
    : libros;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recomana un llibre</Text>

      <FlatList
        data={libros}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width * 0.9 + 30}
        decelerationRate="fast"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LibroCard libro={item} />}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <Image source={swordBackIcon} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default LibroScreen;
