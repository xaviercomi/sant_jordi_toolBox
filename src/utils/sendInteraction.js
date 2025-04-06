import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.0.10:5000/api/interacciones";

export const sendInteraction = async ({ destinatario_nombre, tipo, id }) => {
  try {
    const userData = await AsyncStorage.getItem("user");
    if (!userData) throw new Error("User data not found in storage");

    const user = JSON.parse(userData);
    const uuid = user?.uuid;

    if (!uuid) throw new Error("UUID not found");

    // Decide que quiere enviar basado en el tipo de interacción
    const payload = {
      uuid,
      destinatario_nombre,
      cita_id: tipo === "cita" ? id : null,
      rosa_id: tipo === "rosa" ? id : null,
      libro_id: tipo === "libro" ? id : null,
    };

    const response = await axios.post(API_URL, payload);
    console.log("Interacción enviada:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error al guardar interacción: ", err.message);
  }
};
