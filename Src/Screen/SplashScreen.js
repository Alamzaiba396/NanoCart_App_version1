import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
  
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

   
    setTimeout(() => {
      navigation.replace("Home"); 
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Animated.Image
        source={require("../assets/Images/Splash.png")} 
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", 
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100, 
    height: 100,
    resizeMode: "contain",
  },
});

export default SplashScreen;
