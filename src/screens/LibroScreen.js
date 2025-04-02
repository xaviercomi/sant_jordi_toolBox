import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  DrawerLayoutAndroid,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/LibroStyles.js";
import swordBackIcon from "../../assets/backIcon.png";
import filterIcon from "../../assets/filterIcon.png";
import { useNavigation } from "@react-navigation/native";
import LibroCard from "../components/LibroCard.js";
import MultiSelect from "react-native-multiple-select";

const { width } = Dimensions.get("window");

const LibroScreen = () => {
  const navigation = useNavigation();
  const [libros, setLibros] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const drawer = useRef(null);
  const allGenres =
    libros && libros.length > 0
      ? [...new Set(libros.map((libro) => libro.genero))]
      : [];

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

  const navigationContainer = () => (
    <View style={styles.navigationContainer}>
      <Text style={styles.textDrawer}>Opcions de filtratge</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <MultiSelect
          items={allGenres.map((genre) => ({ id: genre, name: genre }))}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedGenres}
          selectedItems={selectedGenres}
          selectText="Seleccionar géneros"
          searchInputPlaceholderText="Buscar géneros..."
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#FFF"
          selectedItemIconColor="#FFF"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#778899"
          submitButtonText="Aplicar"
          styleDropdownMenu={styles.dropdownMenu}
          styleInputGroup={styles.inputGroup}
          styleItemsContainer={styles.itemsContainer}
          hideSubmitButton={false}
        />
      )}
      <Button
        color="#778899"
        title="tanca"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  const filterByGenre = (genre) => {
    if (genre === "all") {
      setSelectedGenres(null);
    } else {
      setSelectedGenres(genre);
    }
  };

  const filteredBooks =
    selectedGenres.length > 0
      ? libros.filter((libro) => selectedGenres.includes(libro.genero))
      : libros;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <DrawerLayoutAndroid
      style={styles.drawer}
      ref={drawer}
      drawerWidth={width * 0.6}
      renderNavigationView={navigationContainer}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Recomana un llibre</Text>

        <TouchableOpacity
          onPress={() => {
            drawer.current?.openDrawer();
          }}
          style={styles.filterButton}
        >
          <Image source={filterIcon} style={styles.filterIcon} />
        </TouchableOpacity>

        <FlatList
          data={libros}
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
              <LibroCard libro={item} />
            </View>
          )}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={styles.backButton}
        >
          <Image source={swordBackIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

export default LibroScreen;
