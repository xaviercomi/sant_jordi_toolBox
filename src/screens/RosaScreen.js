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
import { sendInteraction } from "../utils/sendInteraction.js";
import Dialog from "react-native-dialog";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const { width } = Dimensions.get("window");

const RosaScreen = () => {
  const navigation = useNavigation();
  const [roses, setRoses] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedRose, setSelectedRose] = useState(null);
  const [recipientName, setRecipientName] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchRoses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/rosas`);
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

  const shareRose = async (rose) => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        alert("Sharing is not available on this device");
        return;
      }
      const imageUrl = `${API_URL}/${rose.imagen_url}`;
      const localUri = `${FileSystem.cacheDirectory}${rose.id}-shared.jpg`;

      const downloadedImage = await FileSystem.downloadAsync(
        imageUrl,
        localUri
      );

      await Sharing.shareAsync(downloadedImage.uri);

      setSelectedRose(rose);
      setShowDialog(true);
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Tria una rosa</Text>
      </View>
      <FlatList
        data={filteredRoses}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => shareRose(item)}
            style={styles.rosesContainer}
          >
            <Image
              source={{
                uri: `${API_URL}/${item.imagen_url}`,
                cache: "force-cache",
              }}
              style={styles.roseImage}
            />
          </TouchableOpacity>
        )}
      />

      <Dialog.Container
        visible={showDialog}
        contentStyle={styles.dialogContainer}
      >
        <Dialog.Title style={styles.dialogTitle}>
          Vols guardar el nom del destinatari?
        </Dialog.Title>
        <Dialog.Description style={styles.dialogDescription}>
          Sabràs a qui has enviat una rosa a els teus lliuraments
        </Dialog.Description>

        <Dialog.Input
          placeholder="Nom del destinatari"
          value={recipientName}
          onChangeText={setRecipientName}
          style={styles.dialogInput}
        />
        <Dialog.Button
          label="Cancel·la"
          style={{
            color: "#FF6B6B",
            fontWeight: "bold",
          }}
          onPress={() => {
            setShowDialog(false);
            setRecipientName("");
          }}
        />
        <Dialog.Button
          label="Desa"
          style={{
            color: "#555",
            fontWeight: "bold",
          }}
          onPress={async () => {
            const nameToSend =
              recipientName.trim() !== "" ? recipientName : "Desconegut";
            await sendInteraction({
              destinatario_nombre: nameToSend,
              tipo: "rosa",
              id: selectedRose.id,
            });
            setShowDialog(false);
            setRecipientName("");
          }}
        />
      </Dialog.Container>
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
          style={[styles.colorButton, { backgroundColor: "#333" }]}
          onPress={() => filterByColor("all")}
        >
          <Text style={styles.textButton}>Tots colors</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <Image source={swordBackIcon} style={styles.backIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default RosaScreen;
