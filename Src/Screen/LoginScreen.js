import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const backIcon = require("../assets/Images/Backward.png");
const forwardIcon = require("../assets/Images/Forward.png");

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={backIcon} style={styles.icon} />
      </TouchableOpacity>

      {/* Centered Login Section */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Mobile No.*"
            placeholderTextColor="#A0A0A0"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.termsText}>
          By continuing, I agree to the{" "}
          <Text style={styles.linkText}>Terms of Use</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policies.</Text>
        </Text>
      </View>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("VerifyOtp")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>CONTINUE</Text>
          <Image source={forwardIcon} style={[styles.icon, styles.forwardIcon]} />
        </TouchableOpacity>

        <Text style={styles.supportText}>
          Having trouble logging in? <Text style={styles.whatsappText}>Whatsapp Us</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  forwardIcon: {
    marginLeft: 8,
    tintColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center", 
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    paddingBottom: 6,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  termsText: {
    fontSize: 12,
    color: "#707070",
    marginTop: 15,
    lineHeight: 18,
  },
  linkText: {
    color: "#D67D3E",
    textDecorationLine: "underline",
  },
  bottomContainer: {
    paddingBottom: 30, // Ensure spacing from the bottom
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#D67D3E",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 5,
    marginBottom: 15, // Space above support text
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  supportText: {
    fontSize: 12,
    color: "#707070",
    textAlign: "center",
  },
  whatsappText: {
    color: "#D67D3E",
    fontWeight: "500",
  },
});

export default LoginScreen;
