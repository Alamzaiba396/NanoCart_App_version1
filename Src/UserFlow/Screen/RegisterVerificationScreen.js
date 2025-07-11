import React, { useState, useRef,useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../redux/reducers/authReducer"; 

const screenWidth = Dimensions.get('window').width;

  const VerificationScreen = ({ route,navigation }) => {
    
  const dispatch = useDispatch();

    const { name, email, phone } = route.params;
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);  
  
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

  useEffect(() => {
    console.log("Route params at OTP screen:", route?.params);
  }, []);

 

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }
    
    const { name, email, phone } = route.params;
    try {
      console.log("Verifying OTP with:", { phoneNumber: phone, otp: enteredOTP });
  
      const verifyResponse = await fetch("http://10.0.2.2:4000/api/auth/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phone,
          otp: enteredOTP,
        }),
      });
  
      const verifyData = await verifyResponse.json();
      console.log("OTP Verify Response:", verifyData);
  
      if (verifyResponse.ok && verifyData.success) {
        // OTP verified, now signup
        const signupResponse = await fetch("http://10.0.2.2:4000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNumber: phone,
            email,
          }),
        });
  
        const signupData = await signupResponse.json();
        console.log("Signup API Response:", signupData);
  
        if (signupResponse.ok && signupData.success) {
          const token = signupData.data.token;
  
          // ✅ Store token in Redux
          dispatch(setAuthToken({ token, user: { name, email, phoneNumber: phone } }));
  
          console.log("✅ Signup successful. Token stored in Redux:", token);
  
          Alert.alert("Success", "Signup successful!", [
            { text: "OK", onPress: () => navigation.navigate("Home") },
          ]);
        } else {
          Alert.alert("Signup Failed", signupData.message || "Something went wrong during signup.");
        }
      } else if (verifyData.message === "OTP expired") {
        Alert.alert("Error", "Your OTP has expired. Please request a new one.");
      } else {
        Alert.alert("OTP Verification Failed", verifyData.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
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
    style={styles.resendLink}
    onPress={async () => {
      try {
        const response = await fetch("http://10.0.2.2:4000/api/auth/otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: phone }),
        });

        const data = await response.json();
        console.log("Resend OTP Response:", data);

        if (response.ok && data.success) {
          Alert.alert("Success", "OTP resent successfully!");
        } else {
          Alert.alert("Error", data.message || "Failed to resend OTP.");
        }
      } catch (error) {
        console.error("Resend OTP Error:", error);
        Alert.alert("Error", "Network error. Please try again.");
      }
    }}
  >
    Resend
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

export default VerificationScreen;

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