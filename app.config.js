import "dotenv/config";

export default {
  expo: {
    name: "Sant Jordi toolbox",
    slug: "sant-jordi-toolbox",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    androidNavigationBar: {
      visible: "immersive",
      backgroundColor: "#292929",
      barStyle: "light-content",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.xaviercomi.SantJordiToolbox",
      buildNumber: "1.0.0",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.xaviercomi.SantJordiToolbox",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      API_URL: process.env.API_URL,
      eas: {
        projectId: "7228a073-eb5c-4550-b0c3-5918b829393d",
      },
    },
  },
};
