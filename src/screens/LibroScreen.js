import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from "react-native";
import styles from "../styles/LibroStyles.js";
import swordBackIcon from "../../assets/backIcon.png";
import filterIcon from "../../assets/filterIcon.png";
import { useNavigation } from "@react-navigation/native";
import LibroCard from "../components/LibroCard.js";
import MultiSelect from "react-native-multiple-select";
import { sendInteraction } from "../utils/sendInteraction";
import Dialog from "react-native-dialog";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const { width } = Dimensions.get("window");

const LibroScreen = () => {
  const navigation = useNavigation();
  const [libros, setLibros] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [recipientName, setRecipientName] = useState("");

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://192.168.0.10:5000/api/libros");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.log("Error fetching libros:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLibros();
  }, []);

  const allGenres =
    libros.length > 0 ? [...new Set(libros.map((libro) => libro.genero))] : [];

  const filteredBooks =
    selectedGenres.length > 0
      ? libros.filter((libro) => selectedGenres.includes(libro.genero))
      : libros;

  const FilterModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
      transparent={false}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filtrar per gènere</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Tancar</Text>
          </TouchableOpacity>
        </View>

        <MultiSelect
          items={allGenres.map((genre) => ({ id: genre, name: genre }))}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedGenres}
          selectedItems={selectedGenres}
          selectText="Gènere literari"
          styleDropdownMenu={styles.dropdownMenu}
          styleItemsContainer={styles.itemsContainer}
          searchInputPlaceholderText="Cerca gèneres..."
          displayKey="name"
          hideSubmitButton={false}
          tagBorderColor="#696969"
          tagTextColor="#FFF"
          searchInputStyle={styles.searchInput}
          selectedItemTextColor={styles.multiSelectText.color}
          selectedItemIconColor="#FFF"
          itemTextColor={styles.multiSelectText.color}
          submitButtonColor="#444"
          submitButtonText="Filtrar"
          styleInputGroup={styles.closedSelector}
          styleTextDropdown={styles.closedSelectorText}
        />
      </View>
    </Modal>
  );

  const shareBook = async (book) => {
    try {
      if (!(await Sharing.isAvailableAsync())) {
        alert("Sharing is not available on this device");
        return;
      }

      const imageUrl = `http://192.168.0.10:5000/${book.portada_url}`;
      const localUri = `${FileSystem.cacheDirectory}${book.id}-shared.jpg`;

      const downloadedImage = await FileSystem.downloadAsync(
        imageUrl,
        localUri
      );

      await Sharing.shareAsync(downloadedImage.uri);

      setSelectedBook(book);
      setShowDialog(true);
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>Recomana un llibre</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.filterButton}
        >
          <Image source={filterIcon} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <FilterModal />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#444" />
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          snapToInterval={width * 0.9}
          decelerationRate="fast"
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: width * 0.05 }}
          renderItem={({ item }) => (
            <View style={{ width: width * 0.9, alignItems: "center" }}>
              <LibroCard libro={item} onShare={() => shareBook(item)} />
            </View>
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.backButton}
      >
        <Image source={swordBackIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Vols guardar el nom del destinatari?</Dialog.Title>
        <Dialog.Description>
          Sabràs a qui has recomanat aquest llibre
        </Dialog.Description>
        <Dialog.Input
          placeholder="Nom del destinatari"
          value={recipientName}
          onChangeText={setRecipientName}
        />
        <Dialog.Button
          label="Cancel·la"
          onPress={async () => {
            const nameToSend =
              recipientName.trim() !== "" ? recipientName : "Desconegut";
            await sendInteraction({
              destinatario_nombre: nameToSend,
              tipo: "libro",
              id: selectedBook.id,
            });
            setShowDialog(false);
            setRecipientName("");
          }}
        />
        <Dialog.Button label="Desa" onPress={sendInteraction} />
      </Dialog.Container>
    </SafeAreaView>
  );
};

export default LibroScreen;
