import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "../styles/RosaStyles.js";
import swordBackIcon from "../../assets/backIcon.png";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");

const RosaScreen = () => {
  const navigation = useNavigation();
  const [roses, setRoses] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchRoses = async () => {
      try {
        const response = await fetch("http://192.168.0.10:5000/api/rosas");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRoses(data);
      } catch (error) {
        console.log("Error fetching roses:", error.message);
      }
    };

    fetchRoses();
  }, []);

  const filterByColor = (color) => {
    if (color === "all") {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const filteredRoses = selectedColor
    ? roses.filter((rose) => rose.color === selectedColor)
    : roses;

  const shareRose = async (imageUrl) => {
    try {
      const localUri = `${FileSystem.cacheDirectory}shared-image.jpg`;
      const downloadedImage = await FileSystem.downloadAsync(
        imageUrl,
        localUri
      );

      if (!(await Sharing.isAvailableAsync())) {
        alert("Sharing is not available on this device");
        return;
      }

      await Sharing.shareAsync(downloadedImage.uri);
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tria una rosa</Text>

      <View style={styles.colorMenu}>
        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: "red", opacity: selectedColor === "roja" },
          ]}
          onPress={() => filterByColor("roja")}
        />
        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: "pink", opacity: selectedColor === "rosa" },
          ]}
          onPress={() => filterByColor("rosa")}
        />
        <TouchableOpacity
          style={[
            styles.colorButton,
            { backgroundColor: "white", opacity: selectedColor === "blanca" },
          ]}
          onPress={() => filterByColor("blanca")}
        />
        <TouchableOpacity
          style={[
            styles.colorButton,
            {
              backgroundColor: "yellow",
              opacity: selectedColor === "amarilla",
            },
          ]}
          onPress={() => filterByColor("amarilla")}
        />
        <TouchableOpacity
          style={[styles.colorButton, { backgroundColor: "black" }]}
          onPress={() => filterByColor("all")}
        >
          <Text style={styles.textButton}>All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRoses}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width * 0.9 + 30}
        decelerationRate="fast"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              shareRose(`http://192.168.0.10:5000/${item.imagen_url}`)
            }
          >
            <Image
              source={{ uri: `http://192.168.0.10:5000/${item.imagen_url}` }}
              style={styles.roseImage}
            />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <Image source={swordBackIcon} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default RosaScreen;
