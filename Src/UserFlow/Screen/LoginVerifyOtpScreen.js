import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/reducers/authReducer";
import { persistor } from "../../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenWidth = Dimensions.get('window').width;
const API_URL = "http://10.0.2.2:4000";

const LoginVerifyOtpScreen = ({ route, navigation }) => {
  const { fromScreen, actionAfterLogin, itemId, phone } = route.params;
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputs = useRef([]);

  const staticUser = {
    name: "Prashant kumar",
    email: "pk@gmail.com",
    phoneNumber: "7488489897",
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev === 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendCooldown]);

  const handleOTPChange = (value, index) => {
    if (isNaN(value)) return;
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);
    if (value !== "" && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (value, index) => {
    if (value === "" && index > 0) {
      const otpArray = [...otp];
      otpArray[index - 1] = "";
      setOtp(otpArray);
      inputs.current[index - 1].focus();
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) {
      Alert.alert("Please wait", `You can resend OTP in ${resendCooldown} seconds.`);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        Alert.alert("Success", "OTP resent successfully!");
        setResendCooldown(30);
      } else {
        Alert.alert("Error", data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }
  
    try {
      console.log("Verifying OTP with:", { phoneNumber: phone, otp: enteredOTP });
  
      const verifyResponse = await fetch(`${API_URL}/api/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, otp: enteredOTP }),
      });
  
      const verifyData = await verifyResponse.json();
      console.log("OTP Verify Response:", verifyData);
  
      if (!verifyResponse.ok || !verifyData.success) {
        if (verifyData.message === "OTP expired") {
          throw new Error("Your OTP has expired. Please request a new one.");
        }
        throw new Error(verifyData.message || "Invalid OTP.");
      }
  
      const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, otp: enteredOTP }),
      });
  
      const loginData = await loginResponse.json();
      console.log("Login API Response:", loginData);
  
      if (!loginResponse.ok || !loginData.success) {
        throw new Error(loginData.message || "Login failed.");
      }
  
      const { token, role } = loginData.data;
  
      await dispatch(setAuthToken({ token, role, user: staticUser }));

// Wait for Redux to save state to AsyncStorage
await new Promise((resolve) => setTimeout(resolve, 300));

await persistor.flush();
console.log("✅ Persistor flushed after login");
const data = await AsyncStorage.getItem("persist:auth");
console.log("✅ Saved Auth State:", data ? JSON.parse(data) : null);
  
      const targetScreen =
        role === "Partner"
          ? "PartnnerHome"
          : fromScreen === "SubCategoryScreen" && actionAfterLogin === "like_item"
          ? { name: "SubCategory", params: { likedItemId: itemId } }
          : fromScreen === "Cart"
          ? "Cart"
          : "UserHome";
  
      navigation.reset({
        index: 0,
        routes: [typeof targetScreen === "string" ? { name: targetScreen } : targetScreen],
      });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/Images/Backward.png')} style={styles.icon} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>OTP Authentication</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to your Mobile No.</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleOTPChange(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(digit, index);
                }
              }}
            />
          ))}
        </View>

        <Text style={styles.resendText}>
          Didn't receive OTP?{' '}
          <Text
            style={[styles.resendLink, resendCooldown > 0 && { color: '#888' }]}
            onPress={handleResendOTP}
          >
            Resend {resendCooldown > 0 ? `(${resendCooldown}s)` : ''}
          </Text>
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.continueButton} onPress={handleVerifyOTP}>
          <Text style={styles.continueText}>CONTINUE</Text>
          <Image source={require('../../assets/Images/Forward.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Having trouble logging in?{' '}
          <Text style={styles.whatsappText} onPress={() => Alert.alert("Support", "Contact us via WhatsApp!")}>
            Whatsapp Us
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginVerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  backButton: {
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  otpInput: {
    fontSize: 18,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
    width: 40,
    marginHorizontal: 6,
  },
  resendText: {
    fontSize: 13,
    color: '#888',
    marginTop: 10,
  },
  resendLink: {
    color: '#D86427',
    fontWeight: '600',
  },
  bottomSection: {
    paddingBottom: 30,
  },
  continueButton: {
    backgroundColor: '#D86427',
    borderRadius: 4,
    paddingVertical: 14,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  whatsappText: {
    color: '#D86427',
    fontWeight: '600',
  },
});