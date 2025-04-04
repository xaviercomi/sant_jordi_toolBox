import React, { useRef } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import styles from "../styles/QuoteCardStyles.js";

const QuoteCard = ({ quote, author }) => {
  const cardRef = useRef(null);

  const shareQuoteImage = async () => {
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
        alert("Sharing is not available on this device");
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Error sharing image:", error);
    }
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 5 }}>
      <View
        ref={cardRef}
        style={{ backgroundColor: "transparent", padding: 10 }}
        collapsable={false}
      >
        <ImageBackground
          source={require("../../assets/paper-texture.jpg")}
          style={styles.card}
          imageStyle={{ borderRadius: 15 }}
        >
          <View style={styles.citaContent}>
            <Text style={styles.quoteText}>"{quote}"</Text>
            <Text style={styles.authorText}>— {author}</Text>
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.shareButton} onPress={shareQuoteImage}>
        <Text style={styles.shareButtonText}>Envia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuoteCard;
